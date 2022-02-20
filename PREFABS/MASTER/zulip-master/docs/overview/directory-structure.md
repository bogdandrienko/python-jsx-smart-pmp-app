# Directory structure

This page documents the Zulip directory structure, where to find
things, and how to decide where to put a file.

You may also find the [new application feature
tutorial](../tutorials/new-feature-tutorial.md) helpful for understanding the
flow through these files.

### Core Python files

Zulip uses the [Django web
framework](https://docs.djangoproject.com/en/1.8/), so a lot of these
paths will be familiar to Django developers.

* `zproject/urls.py` Main
  [Django routes file](https://docs.djangoproject.com/en/1.8/topics/http/urls/).
  Defines which URLs are handled by which view functions or templates.

* `zerver/models.py` Main
  [Django models](https://docs.djangoproject.com/en/1.8/topics/db/models/)
  file.  Defines Zulip's database tables.

* `zerver/lib/*.py` Most library code.

* `zerver/lib/actions.py` Most code doing writes to user-facing
  database tables lives here.  In particular, we have a policy that
  all code calling `send_event` to trigger [pushing data to
  clients](../subsystems/events-system.md) must live here.

* `zerver/views/*.py` Most [Django views](https://docs.djangoproject.com/en/1.8/topics/http/views/).

* `zerver/webhooks/` Webhook views and tests for [Zulip's incoming webhook integrations](
  https://zulip.com/api/incoming-webhooks-overview).

* `zerver/tornado/views.py` Tornado views.

* `zerver/worker/queue_processors.py` [Queue workers](../subsystems/queuing.md).

* `zerver/lib/markdown/` [Backend Markdown processor](../subsystems/markdown.md).

* `zproject/backends.py` [Authentication backends](https://docs.djangoproject.com/en/1.8/topics/auth/customizing/).

-------------------------------------------------------------------

### HTML templates

See [our docs](../subsystems/html-css.md) for details on Zulip's
templating systems.

* `templates/zerver/` For [Jinja2](http://jinja.pocoo.org/) templates
  for the backend (for zerver app; logged-in content is in `templates/zerver/app`).

* `static/templates/` [Handlebars](https://handlebarsjs.com/) templates for the frontend.

----------------------------------------

### JavaScript, TypeScript, and other static assets

* `static/js/` Zulip's own JavaScript and TypeScript sources.

* `static/styles/` Zulip's own CSS.

* `static/images/` Zulip's images.

* `static/third/` Third-party JavaScript and CSS that has been vendored.

* `node_modules/` Third-party JavaScript installed via `yarn`.

* `static/assets/` For assets not to be served to the web (e.g. the system to
                   generate our favicons).

-----------------------------------------------------------------------

### Tests

* `zerver/tests/` Backend tests.

* `frontend_tests/node_tests/` Node Frontend unit tests.

* `frontend_tests/puppeteer_tests/` Puppeteer frontend integration tests.

* `tools/test-*` Developer-facing test runner scripts.

-----------------------------------------------------

### Management commands

These are distinguished from scripts, below, by needing to run a
Django context (i.e. with database access).

* `zerver/management/commands/`
  [Management commands](../subsystems/management-commands.md) one might run at a
  production deployment site (e.g. scripts to change a value or
  deactivate a user properly).

* `zilencer/management/commands/` includes some dev-specific
   commands such as `populate_db`, which are not included in
   the production distribution.

---------------------------------------------------------------

### Scripts

* `scripts/` Scripts that production deployments might run manually
  (e.g., `restart-server`).

* `scripts/lib/` Scripts that are needed on production deployments but
  humans should never run directly.

* `scripts/setup/` Scripts that production deployments will only run
  once, during installation.

* `tools/` Scripts used only in a Zulip development environment.
  These are not included in production release tarballs for Zulip, so
  that we can include scripts here one wouldn't want someone to run in
  production accidentally (e.g. things that delete the Zulip database
  without prompting).

* `tools/setup/` Subdirectory of `tools/` for things only used during
  the development environment setup process.

* `tools/ci/` Subdirectory of `tools/` for things only used to
  set up and run our tests in CI.  Actual test suites should
  go in `tools/`.

---------------------------------------------------------

### API and bots

* See the [Zulip API repository](https://github.com/zulip/python-zulip-api).
  Zulip's Python API bindings, a number of Zulip integrations and
  bots, and a framework for running and testing Zulip bots, used to be
  developed in the main Zulip server repo but are now in their own repo.

* `templates/zerver/integrations/` (within `templates/zerver/`, above).
  Documentation for these integrations.

-------------------------------------------------------------------------

### Production Puppet configuration

This is used to deploy essentially all configuration in production.

* `puppet/zulip/` For configuration for production deployments.

* `puppet/zulip/manifests/profile/standalone.pp` Main manifest for Zulip standalone deployments.

-----------------------------------------------------------------------

### Additional Django apps

* `confirmation` Email confirmation system.

* `analytics` Analytics for the Zulip server administrator (needs work to
  be useful to normal Zulip sites).

* `corporate` The old Zulip.com website.  Not included in production
  distribution.

* `zilencer` Primarily used to hold management commands that aren't
  used in production.  Not included in production distribution.

-----------------------------------------------------------------------

### Jinja2 compatibility files

* `zproject/jinja2/__init__.py` Jinja2 environment.

-----------------------------------------------------------------------

### Translation files

* `locale/` Backend (Django) and frontend translation data files.

-----------------------------------------------------------------------

### Documentation

*  `docs/`        Source for this documentation.

--------------------------------------------------------------

You can consult the repository's `.gitattributes` file to see exactly
which components are excluded from production releases (release
tarballs are generated using `tools/build-release-tarball`).
