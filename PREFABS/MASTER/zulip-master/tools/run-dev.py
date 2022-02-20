#!/usr/bin/env python3
import argparse
import os
import pwd
import signal
import subprocess
import sys
from typing import Any, Callable, Generator, List, Sequence
from urllib.parse import urlunparse

# check for the venv
from lib import sanity_check

sanity_check.check_venv(__file__)

from tornado import gen, httpclient, httputil, web
from tornado.ioloop import IOLoop

TOOLS_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(TOOLS_DIR))

from tools.lib.test_script import assert_provisioning_status_ok

if 'posix' in os.name and os.geteuid() == 0:
    raise RuntimeError("run-dev.py should not be run as root.")

DESCRIPTION = '''
Starts the app listening on localhost, for local development.

This script launches the Django and Tornado servers, then runs a reverse proxy
which serves to both of them.  After it's all up and running, browse to

    http://localhost:9991/

Note that, while runserver and runtornado have the usual auto-restarting
behavior, the reverse proxy itself does *not* automatically restart on changes
to this file.
'''

parser = argparse.ArgumentParser(description=DESCRIPTION,
                                 formatter_class=argparse.RawTextHelpFormatter)

parser.add_argument('--test',
                    action='store_true',
                    help='Use the testing database and ports')
parser.add_argument('--minify',
                    action='store_true',
                    help='Minifies assets for testing in dev')
parser.add_argument('--interface',
                    help='Set the IP or hostname for the proxy to listen on')
parser.add_argument('--no-clear-memcached',
                    action='store_false', dest='clear_memcached',
                    help='Do not clear memcached on startup')
parser.add_argument('--streamlined',
                    action="store_true",
                    help='Avoid thumbor, etc.')
parser.add_argument('--force',
                    action="store_true",
                    help='Run command despite possible problems.')
parser.add_argument('--enable-tornado-logging',
                    action="store_true",
                    help='Enable access logs from tornado proxy server.')
options = parser.parse_args()

assert_provisioning_status_ok(options.force)

if options.interface is None:
    user_id = os.getuid()
    user_name = pwd.getpwuid(user_id).pw_name
    if user_name in ["vagrant", "zulipdev"]:
        # In the Vagrant development environment, we need to listen on
        # all ports, and it's safe to do so, because Vagrant is only
        # exposing certain guest ports (by default just 9991) to the
        # host.  The same argument applies to the remote development
        # servers using username "zulipdev".
        options.interface = None
    else:
        # Otherwise, only listen to requests on localhost for security.
        options.interface = "127.0.0.1"
elif options.interface == "":
    options.interface = None

runserver_args: List[str] = []
base_port = 9991
if options.test:
    base_port = 9981
    settings_module = "zproject.test_settings"
    # Don't auto-reload when running Puppeteer tests
    runserver_args = ['--noreload']
else:
    settings_module = "zproject.settings"

manage_args = [f'--settings={settings_module}']
os.environ['DJANGO_SETTINGS_MODULE'] = settings_module

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from scripts.lib.zulip_tools import CYAN, ENDC, FAIL

proxy_port = base_port
django_port = base_port + 1
tornado_port = base_port + 2
webpack_port = base_port + 3
thumbor_port = base_port + 4

os.chdir(os.path.join(os.path.dirname(__file__), '..'))

# Clean up stale .pyc files etc.
subprocess.check_call('./tools/clean-repo')

if options.clear_memcached:
    subprocess.check_call('./scripts/setup/flush-memcached')

# Set up a new process group, so that we can later kill run{server,tornado}
# and all of the processes they spawn.
os.setpgrp()

# Save pid of parent process to the pid file. It can be used later by
# tools/stop-run-dev to kill the server without having to find the
# terminal in question.

if options.test:
    pid_file_path = os.path.join(os.path.join(os.getcwd(), 'var/puppeteer/run_dev.pid'))
else:
    pid_file_path = os.path.join(os.path.join(os.getcwd(), 'var/run/run_dev.pid'))

# Required for compatibility python versions.
if not os.path.exists(os.path.dirname(pid_file_path)):
    os.makedirs(os.path.dirname(pid_file_path))
with open(pid_file_path, 'w+') as f:
    f.write(str(os.getpgrp()) + "\n")

def server_processes() -> List[List[str]]:
    main_cmds = [
        ['./manage.py', 'rundjangoserver',
         *manage_args, *runserver_args, f'127.0.0.1:{django_port}'],
        ['env', 'PYTHONUNBUFFERED=1', './manage.py', 'runtornado',
         *manage_args, f'127.0.0.1:{tornado_port}'],
    ]

    if options.streamlined:
        # The streamlined operation allows us to do many
        # things, but search/thumbor/etc. features won't work.
        return main_cmds

    other_cmds = [
        ['./manage.py', 'process_queue', '--all', *manage_args],
        ['env', 'PGHOST=127.0.0.1',  # Force password authentication using .pgpass
         './puppet/zulip/files/postgresql/process_fts_updates', '--quiet'],
        ['./manage.py', 'deliver_scheduled_messages'],
        ['/srv/zulip-thumbor-venv/bin/thumbor', '--conf=./zthumbor/thumbor_settings.py',
         f'--port={thumbor_port}'],
    ]

    # NORMAL (but slower) operation:
    return main_cmds + other_cmds

def do_one_time_webpack_compile() -> None:
    # We just need to compile webpack assets once at startup, not run a daemon,
    # in test mode.  Additionally, webpack-dev-server doesn't support running 2
    # copies on the same system, so this model lets us run the Puppeteer tests
    # with a running development server.
    subprocess.check_call(['./tools/webpack', '--quiet', '--test'])

def start_webpack_watcher() -> "subprocess.Popen[bytes]":
    webpack_cmd = ['./tools/webpack', '--watch', f'--port={webpack_port}']
    if options.minify:
        webpack_cmd.append('--minify')
    if options.interface is None:
        # If interface is None and we're listening on all ports, we also need
        # to disable the webpack host check so that webpack will serve assets.
        webpack_cmd.append('--disable-host-check')
    if options.interface:
        webpack_cmd.append(f"--host={options.interface}")
    else:
        webpack_cmd.append("--host=0.0.0.0")
    return subprocess.Popen(webpack_cmd)

def transform_url(protocol: str, path: str, query: str, target_port: int, target_host: str) -> str:
    # generate url with target host
    host = ":".join((target_host, str(target_port)))
    # Here we are going to rewrite the path a bit so that it is in parity with
    # what we will have for production
    if path.startswith('/thumbor'):
        path = path[len('/thumbor'):]
    newpath = urlunparse((protocol, host, path, '', query, ''))
    return newpath

@gen.engine
def fetch_request(url: str, callback: Any, **kwargs: Any) -> "Generator[Callable[..., Any], Any, None]":
    # use large timeouts to handle polling requests
    req = httpclient.HTTPRequest(
        url,
        connect_timeout=240.0,
        request_timeout=240.0,
        decompress_response=False,
        **kwargs,
    )
    client = httpclient.AsyncHTTPClient()
    # wait for response
    response = yield gen.Task(client.fetch, req)
    callback(response)


class BaseHandler(web.RequestHandler):
    # target server ip
    target_host: str = '127.0.0.1'
    # target server port
    target_port: int

    def _add_request_headers(
        self, exclude_lower_headers_list: Sequence[str] = [],
    ) -> httputil.HTTPHeaders:
        headers = httputil.HTTPHeaders()
        for header, v in self.request.headers.get_all():
            if header.lower() not in exclude_lower_headers_list:
                headers.add(header, v)
        return headers

    def get(self) -> None:
        pass

    def head(self) -> None:
        pass

    def post(self) -> None:
        pass

    def put(self) -> None:
        pass

    def patch(self) -> None:
        pass

    def options(self) -> None:
        pass

    def delete(self) -> None:
        pass

    def handle_response(self, response: Any) -> None:
        if response.error and not isinstance(response.error, httpclient.HTTPError):
            self.set_status(500)
            self.write('Internal server error:\n' + str(response.error))
        else:
            self.set_status(response.code, response.reason)
            self._headers = httputil.HTTPHeaders()  # clear tornado default header

            for header, v in response.headers.get_all():
                # some header appear multiple times, eg 'Set-Cookie'
                self.add_header(header, v)
            if response.body:
                self.write(response.body)
        self.finish()

    @web.asynchronous
    def prepare(self) -> None:
        if 'X-REAL-IP' not in self.request.headers:
            self.request.headers['X-REAL-IP'] = self.request.remote_ip
        if 'X-FORWARDED_PORT' not in self.request.headers:
            self.request.headers['X-FORWARDED-PORT'] = str(proxy_port)
        url = transform_url(
            self.request.protocol,
            self.request.path,
            self.request.query,
            self.target_port,
            self.target_host,
        )
        try:
            fetch_request(
                url=url,
                callback=self.handle_response,
                method=self.request.method,
                headers=self._add_request_headers(["upgrade-insecure-requests"]),
                follow_redirects=False,
                body=getattr(self.request, 'body'),
                allow_nonstandard_methods=True,
            )
        except httpclient.HTTPError as e:
            if hasattr(e, 'response') and e.response:
                self.handle_response(e.response)
            else:
                self.set_status(500)
                self.write('Internal server error:\n' + str(e))
                self.finish()


class WebPackHandler(BaseHandler):
    target_port = webpack_port


class DjangoHandler(BaseHandler):
    target_port = django_port


class TornadoHandler(BaseHandler):
    target_port = tornado_port


class ThumborHandler(BaseHandler):
    target_port = thumbor_port


class ErrorHandler(BaseHandler):
    @web.asynchronous
    def prepare(self) -> None:
        print(FAIL + 'Unexpected request: ' + ENDC, self.request.path)
        self.set_status(500)
        self.write('path not supported')
        self.finish()

def using_thumbor() -> bool:
    return not options.streamlined

class Application(web.Application):
    def __init__(self, enable_logging: bool = False) -> None:
        handlers = [
            (r"/json/events.*", TornadoHandler),
            (r"/api/v1/events.*", TornadoHandler),
            (r"/webpack.*", WebPackHandler),
            (r"/thumbor.*", ThumborHandler if using_thumbor() else ErrorHandler),
            (r"/.*", DjangoHandler),
        ]
        super().__init__(handlers, enable_logging=enable_logging)

    def log_request(self, handler: BaseHandler) -> None:
        if self.settings['enable_logging']:
            super().log_request(handler)


def on_shutdown() -> None:
    IOLoop.instance().stop()


def shutdown_handler(*args: Any, **kwargs: Any) -> None:
    io_loop = IOLoop.instance()
    if io_loop._callbacks:
        io_loop.call_later(1, shutdown_handler)
    else:
        io_loop.stop()

def print_listeners() -> None:
    external_host = os.getenv('EXTERNAL_HOST', f'localhost:{proxy_port}')
    print(f"\nStarting Zulip on:\n\n\t{CYAN}http://{external_host}/{ENDC}\n\nInternal ports:")
    ports = [
        (proxy_port, 'Development server proxy (connect here)'),
        (django_port, 'Django'),
        (tornado_port, 'Tornado'),
    ]

    if not options.test:
        ports.append((webpack_port, 'webpack'))

    if using_thumbor():
        ports.append((thumbor_port, 'Thumbor'))

    for port, label in ports:
        print(f'   {port}: {label}')
    print()

children = []

try:
    if options.test:
        do_one_time_webpack_compile()
    else:
        children.append(start_webpack_watcher())

    for cmd in server_processes():
        children.append(subprocess.Popen(cmd))

    app = Application(enable_logging=options.enable_tornado_logging)
    try:
        app.listen(proxy_port, address=options.interface)
    except OSError as e:
        if e.errno == 98:
            print('\n\nERROR: You probably have another server running!!!\n\n')
        raise

    print_listeners()

    ioloop = IOLoop.instance()
    for s in (signal.SIGINT, signal.SIGTERM):
        signal.signal(s, shutdown_handler)
    ioloop.start()
finally:
    for child in children:
        child.terminate()

    print("Waiting for children to stop...")
    for child in children:
        child.wait()

    # Remove pid file when development server closed correctly.
    os.remove(pid_file_path)
