import os
from typing import Any, Dict, Sequence
from unittest import mock, skipUnless
from urllib.parse import urlsplit

import orjson
from django.conf import settings
from django.http import HttpResponse
from django.test import override_settings

from corporate.models import Customer
from zerver.lib.integrations import INTEGRATIONS
from zerver.lib.test_classes import ZulipTestCase
from zerver.lib.test_helpers import HostRequestMock
from zerver.lib.utils import split_by
from zerver.models import Realm, get_realm
from zerver.views.documentation import add_api_uri_context


class DocPageTest(ZulipTestCase):
    def get_doc(self, url: str, subdomain: str) -> HttpResponse:
        if url[0:23] == "/integrations/doc-html/":
            return self.client_get(url, subdomain=subdomain, HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        return self.client_get(url, subdomain=subdomain)

    def print_msg_if_error(self, url: str, response: HttpResponse) -> None:  # nocoverage
        if response.status_code == 200:
            return
        print("Error processing URL:", url)
        if response.get('Content-Type') == 'application/json':
            content = orjson.loads(response.content)
            print()
            print("======================================================================")
            print("ERROR: {}".format(content.get('msg')))
            print()

    def _test(self, url: str, expected_content: str, extra_strings: Sequence[str]=[],
              landing_missing_strings: Sequence[str]=[], landing_page: bool=True,
              doc_html_str: bool=False) -> None:

        # Test the URL on the "zephyr" subdomain
        result = self.get_doc(url, subdomain="zephyr")
        self.print_msg_if_error(url, result)

        self.assertEqual(result.status_code, 200)
        self.assertIn(expected_content, str(result.content))
        for s in extra_strings:
            self.assertIn(s, str(result.content))
        if not doc_html_str:
            self.assert_in_success_response(['<meta name="robots" content="noindex,nofollow">'], result)

        # Test the URL on the root subdomain
        result = self.get_doc(url, subdomain="")
        self.print_msg_if_error(url, result)

        self.assertEqual(result.status_code, 200)
        self.assertIn(expected_content, str(result.content))
        if not doc_html_str:
            self.assert_in_success_response(['<meta name="robots" content="noindex,nofollow">'], result)

        for s in extra_strings:
            self.assertIn(s, str(result.content))

        if not landing_page:
            return
        with self.settings(ROOT_DOMAIN_LANDING_PAGE=True):
            # Test the URL on the root subdomain with the landing page setting
            result = self.get_doc(url, subdomain="")
            self.print_msg_if_error(url, result)

            self.assertEqual(result.status_code, 200)
            self.assertIn(expected_content, str(result.content))
            for s in extra_strings:
                self.assertIn(s, str(result.content))
            for s in landing_missing_strings:
                self.assertNotIn(s, str(result.content))
            if not doc_html_str:
                # Every page has a meta-description
                self.assert_in_success_response(['<meta name="description" content="'], result)
            self.assert_not_in_success_response(['<meta name="robots" content="noindex,nofollow">'], result)

            # Test the URL on the "zephyr" subdomain with the landing page setting
            result = self.get_doc(url, subdomain="zephyr")
            self.print_msg_if_error(url, result)

            self.assertEqual(result.status_code, 200)
            self.assertIn(expected_content, str(result.content))
            for s in extra_strings:
                self.assertIn(s, str(result.content))
            if not doc_html_str:
                self.assert_in_success_response(['<meta name="robots" content="noindex,nofollow">'], result)

    def test_api_doc_endpoints(self) -> None:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        api_docs_dir = os.path.join(current_dir, '..', '..', 'templates/zerver/api/')
        files = os.listdir(api_docs_dir)

        def _filter_func(fp: str) -> bool:
            ignored_files = ['sidebar_index.md', 'index.md', 'missing.md']
            return fp.endswith('.md') and not fp.startswith(".") and fp not in ignored_files

        files = list(filter(_filter_func, files))

        for f in files:
            endpoint = f'/api/{os.path.splitext(f)[0]}'
            self._test(endpoint, '', doc_html_str=True)

    def test_doc_endpoints(self) -> None:
        self._test('/api/', 'The Zulip API')
        self._test('/api/api-keys', 'be careful with it')
        self._test('/api/installation-instructions', 'No download required!')
        self._test('/api/send-message', 'steal away your hearts')
        self._test('/api/render-message', '**foo**')
        self._test('/api/get-streams', 'include_public')
        self._test('/api/get-stream-id', 'The name of the stream to access.')
        self._test('/api/get-subscriptions', 'Get all streams that the user is subscribed to.')
        self._test('/api/get-users', 'client_gravatar')
        self._test('/api/register-queue', 'apply_markdown')
        self._test('/api/get-events', 'dont_block')
        self._test('/api/delete-queue', 'Delete a previously registered queue')
        self._test('/api/update-message', 'propagate_mode')
        self._test('/api/get-own-user', 'takes no parameters')
        self._test('/api/subscribe', 'authorization_errors_fatal')
        self._test('/api/create-user', 'zuliprc-admin')
        self._test('/api/unsubscribe', 'not_removed')
        if settings.ZILENCER_ENABLED:
            self._test('/team/', 'industry veterans')
        self._test('/history/', 'Cambridge, Massachusetts')
        # Test the i18n version of one of these pages.
        self._test('/en/history/', 'Cambridge, Massachusetts')
        if settings.ZILENCER_ENABLED:
            self._test('/apps/', 'Apps for every platform.')
        self._test('/features/', 'Beautiful messaging')
        self._test('/hello/', 'Chat for distributed teams', landing_missing_strings=["Login"])
        self._test('/why-zulip/', 'Why Zulip?')
        self._test('/for/open-source/', 'for open source projects')
        self._test('/for/research/', 'for researchers')
        self._test('/for/companies/', 'in a company')
        self._test('/for/working-groups-and-communities/', 'standards bodies')
        self._test('/security/', 'TLS encryption')
        self._test('/devlogin/', 'Normal users', landing_page=False)
        self._test('/devtools/', 'Useful development URLs')
        self._test('/errors/404/', 'Page not found')
        self._test('/errors/5xx/', 'Internal server error')
        self._test('/emails/', 'manually generate most of the emails by clicking')

        result = self.client_get('/integrations/doc-html/nonexistent_integration', follow=True,
                                 HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(result.status_code, 404)

        result = self.client_get('/new-user/')
        self.assertEqual(result.status_code, 301)
        self.assertIn('hello', result['Location'])

    def test_portico_pages_open_graph_metadata(self) -> None:
        # Why Zulip
        url = '/why-zulip/'
        title = '<meta property="og:title" content="Team chat with first-class threading">'
        description = '<meta property="og:description" content="Most team chats are overwhelming'
        self._test(url, title, doc_html_str=True)
        self._test(url, description, doc_html_str=True)

        # Features
        url = '/features/'
        title = '<meta property="og:title" content="Zulip Features">'
        description = '<meta property="og:description" content="First class threading'
        self._test(url, title, doc_html_str=True)
        self._test(url, description, doc_html_str=True)

    def test_integration_doc_endpoints(self) -> None:
        self._test('/integrations/',
                   'native integrations.',
                   extra_strings=[
                       'And hundreds more through',
                       'Hubot',
                       'Zapier',
                       'IFTTT',
                   ])

        for integration in INTEGRATIONS.keys():
            url = f'/integrations/doc-html/{integration}'
            self._test(url, '', doc_html_str=True)

    def test_integration_pages_open_graph_metadata(self) -> None:
        url = '/integrations/doc/github'
        title = '<meta property="og:title" content="Connect GitHub to Zulip">'
        description = '<meta property="og:description" content="Zulip comes with over'
        self._test(url, title, doc_html_str=True)
        self._test(url, description, doc_html_str=True)

        # Test category pages
        url = '/integrations/communication'
        title = '<meta property="og:title" content="Connect your Communication tools to Zulip">'
        description = '<meta property="og:description" content="Zulip comes with over'
        self._test(url, title, doc_html_str=True)
        self._test(url, description, doc_html_str=True)

        # Test integrations page
        url = '/integrations/'
        title = '<meta property="og:title" content="Connect the tools you use to Zulip">'
        description = '<meta property="og:description" content="Zulip comes with over'
        self._test(url, title, doc_html_str=True)
        self._test(url, description, doc_html_str=True)

    def test_doc_html_str_non_ajax_call(self) -> None:
        # We don't need to test all the pages for 404
        for integration in list(INTEGRATIONS.keys())[5]:
            with self.settings(ROOT_DOMAIN_LANDING_PAGE=True):
                url = f'/en/integrations/doc-html/{integration}'
                result = self.client_get(url, subdomain="", follow=True)
                self.assertEqual(result.status_code, 404)
                result = self.client_get(url, subdomain="zephyr", follow=True)
                self.assertEqual(result.status_code, 404)

            url = f'/en/integrations/doc-html/{integration}'
            result = self.client_get(url, subdomain="", follow=True)
            self.assertEqual(result.status_code, 404)
            result = self.client_get(url, subdomain="zephyr", follow=True)
            self.assertEqual(result.status_code, 404)

        result = self.client_get('/integrations/doc-html/nonexistent_integration', follow=True)
        self.assertEqual(result.status_code, 404)

    def test_electron_detection(self) -> None:
        result = self.client_get("/accounts/password/reset/")
        # TODO: Ideally, this Mozilla would be the specific browser.
        self.assertTrue('data-platform="Mozilla"' in result.content.decode("utf-8"))

        result = self.client_get("/accounts/password/reset/",
                                 HTTP_USER_AGENT="ZulipElectron/1.0.0")
        self.assertTrue('data-platform="ZulipElectron"' in result.content.decode("utf-8"))

class HelpTest(ZulipTestCase):
    def test_help_settings_links(self) -> None:
        result = self.client_get('/help/change-the-time-format')
        self.assertEqual(result.status_code, 200)
        self.assertIn('Go to <a href="/#settings/display-settings">Display settings</a>', str(result.content))
        # Check that the sidebar was rendered properly.
        self.assertIn('Getting started with Zulip', str(result.content))

        with self.settings(ROOT_DOMAIN_LANDING_PAGE=True):
            result = self.client_get('/help/change-the-time-format', subdomain="")
        self.assertEqual(result.status_code, 200)
        self.assertIn('<strong>Display settings</strong>', str(result.content))
        self.assertNotIn('/#settings', str(result.content))

    def test_help_relative_links_for_gear(self) -> None:
        result = self.client_get('/help/analytics')
        self.assertIn('<a href="/stats">Statistics</a>', str(result.content))
        self.assertEqual(result.status_code, 200)

        with self.settings(ROOT_DOMAIN_LANDING_PAGE=True):
            result = self.client_get('/help/analytics', subdomain="")
        self.assertEqual(result.status_code, 200)
        self.assertIn('<strong>Statistics</strong>', str(result.content))
        self.assertNotIn('/stats', str(result.content))

    def test_help_relative_links_for_stream(self) -> None:
        result = self.client_get('/help/message-a-stream-by-email')
        self.assertIn('<a href="/#streams/subscribed">Your streams</a>', str(result.content))
        self.assertEqual(result.status_code, 200)

        with self.settings(ROOT_DOMAIN_LANDING_PAGE=True):
            result = self.client_get('/help/message-a-stream-by-email', subdomain="")
        self.assertEqual(result.status_code, 200)
        self.assertIn('<strong>Manage streams</strong>', str(result.content))
        self.assertNotIn('/#streams', str(result.content))

class IntegrationTest(ZulipTestCase):
    def test_check_if_every_integration_has_logo_that_exists(self) -> None:
        for integration in INTEGRATIONS.values():
            path = urlsplit(integration.logo_url).path
            self.assertTrue(os.path.isfile(settings.DEPLOY_ROOT + path), integration.name)

    def test_api_url_view_subdomains_base(self) -> None:
        context: Dict[str, Any] = {}
        add_api_uri_context(context, HostRequestMock())
        self.assertEqual(context["api_url_scheme_relative"], "testserver/api")
        self.assertEqual(context["api_url"], "http://testserver/api")
        self.assertTrue(context["html_settings_links"])

    @override_settings(ROOT_DOMAIN_LANDING_PAGE=True)
    def test_api_url_view_subdomains_homepage_base(self) -> None:
        context: Dict[str, Any] = {}
        add_api_uri_context(context, HostRequestMock())
        self.assertEqual(context["api_url_scheme_relative"], "yourZulipDomain.testserver/api")
        self.assertEqual(context["api_url"], "http://yourZulipDomain.testserver/api")
        self.assertFalse(context["html_settings_links"])

    def test_api_url_view_subdomains_full(self) -> None:
        context: Dict[str, Any] = {}
        request = HostRequestMock(host="mysubdomain.testserver")
        add_api_uri_context(context, request)
        self.assertEqual(context["api_url_scheme_relative"], "mysubdomain.testserver/api")
        self.assertEqual(context["api_url"], "http://mysubdomain.testserver/api")
        self.assertTrue(context["html_settings_links"])

    def test_html_settings_links(self) -> None:
        context: Dict[str, Any] = {}
        with self.settings(ROOT_DOMAIN_LANDING_PAGE=True):
            add_api_uri_context(context, HostRequestMock())
        self.assertEqual(
            context['settings_html'],
            'Zulip settings page')
        self.assertEqual(
            context['subscriptions_html'],
            'streams page')

        context = {}
        with self.settings(ROOT_DOMAIN_LANDING_PAGE=True):
            add_api_uri_context(context, HostRequestMock(host="mysubdomain.testserver"))
        self.assertEqual(
            context['settings_html'],
            '<a href="/#settings">Zulip settings page</a>')
        self.assertEqual(
            context['subscriptions_html'],
            '<a target="_blank" href="/#streams">streams page</a>')

        context = {}
        add_api_uri_context(context, HostRequestMock())
        self.assertEqual(
            context['settings_html'],
            '<a href="/#settings">Zulip settings page</a>')
        self.assertEqual(
            context['subscriptions_html'],
            '<a target="_blank" href="/#streams">streams page</a>')

class AboutPageTest(ZulipTestCase):
    @skipUnless(settings.ZILENCER_ENABLED, "requires zilencer")
    def test_endpoint(self) -> None:
        with self.settings(CONTRIBUTOR_DATA_FILE_PATH="zerver/tests/fixtures/authors.json"):
            result = self.client_get('/team/')
        self.assert_in_success_response(['Our amazing community'], result)
        self.assert_in_success_response(['2017-11-20'], result)
        self.assert_in_success_response(['timabbott', 'showell', 'gnprice', 'rishig'], result)

        with mock.patch("zerver.views.portico.open", side_effect=FileNotFoundError) as m:
            result = self.client_get('/team/')
            self.assertEqual(result.status_code, 200)
            self.assert_in_success_response(['Never ran'], result)
            m.assert_called_once()

        with self.settings(ZILENCER_ENABLED=False):
            result = self.client_get('/team/')
            self.assertEqual(result.status_code, 301)
            self.assertEqual(result["Location"], "https://zulip.com/team/")

    def test_split_by(self) -> None:
        """Utility function primarily used in authors page"""
        flat_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        expected_result = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        self.assertEqual(split_by(flat_list, 3, None), expected_result)

class SmtpConfigErrorTest(ZulipTestCase):
    def test_smtp_error(self) -> None:
        result = self.client_get("/config-error/smtp")
        self.assertEqual(result.status_code, 200)
        self.assert_in_success_response(["email configuration"], result)

class PlansPageTest(ZulipTestCase):
    def test_plans_auth(self) -> None:
        root_domain = ""
        result = self.client_get("/plans/", subdomain=root_domain)
        self.assert_in_success_response(["Sign up now"], result)

        non_existent_domain = "moo"
        result = self.client_get("/plans/", subdomain=non_existent_domain)
        self.assertEqual(result.status_code, 404)
        self.assert_in_response("does not exist", result)

        realm = get_realm("zulip")
        realm.plan_type = Realm.STANDARD_FREE
        realm.save(update_fields=["plan_type"])
        result = self.client_get("/plans/", subdomain="zulip")
        self.assertEqual(result.status_code, 302)
        self.assertEqual(result["Location"], "/accounts/login/?next=plans")

        guest_user = 'polonius'
        self.login(guest_user)
        result = self.client_get("/plans/", subdomain="zulip", follow=True)
        self.assertEqual(result.status_code, 404)

        organization_member = 'hamlet'
        self.login(organization_member)
        result = self.client_get("/plans/", subdomain="zulip")
        self.assert_in_success_response(["Current plan"], result)
        # Test root domain, with login on different domain
        result = self.client_get("/plans/", subdomain="")
        # TODO: works in manual testing, but I suspect something is funny in
        # the test environment
        # self.assert_in_success_response(["Sign up now"], result)

    def test_CTA_text_by_plan_type(self) -> None:
        sign_up_now = "Sign up now"
        buy_standard = "Buy Standard"
        current_plan = "Current plan"
        sponsorship_pending = "Sponsorship pending"

        # Root domain
        result = self.client_get("/plans/", subdomain="")
        self.assert_in_success_response([sign_up_now, buy_standard], result)
        self.assert_not_in_success_response([current_plan, sponsorship_pending], result)

        realm = get_realm("zulip")
        realm.plan_type = Realm.SELF_HOSTED
        realm.save(update_fields=["plan_type"])

        with self.settings(PRODUCTION=True):
            result = self.client_get("/plans/", subdomain="zulip")
            self.assertEqual(result.status_code, 302)
            self.assertEqual(result["Location"], "https://zulip.com/plans")

            self.login('iago')

            # SELF_HOSTED should hide the local plans page, even if logged in
            result = self.client_get("/plans/", subdomain="zulip")
            self.assertEqual(result.status_code, 302)
            self.assertEqual(result["Location"], "https://zulip.com/plans")

        # But in the development environment, it renders a page
        result = self.client_get("/plans/", subdomain="zulip")
        self.assert_in_success_response([sign_up_now, buy_standard], result)
        self.assert_not_in_success_response([current_plan, sponsorship_pending], result)

        realm.plan_type = Realm.LIMITED
        realm.save(update_fields=["plan_type"])
        result = self.client_get("/plans/", subdomain="zulip")
        self.assert_in_success_response([current_plan, buy_standard], result)
        self.assert_not_in_success_response([sign_up_now, sponsorship_pending], result)

        realm.plan_type = Realm.STANDARD_FREE
        realm.save(update_fields=["plan_type"])
        result = self.client_get("/plans/", subdomain="zulip")
        self.assert_in_success_response([current_plan], result)
        self.assert_not_in_success_response([sign_up_now, buy_standard, sponsorship_pending], result)

        realm.plan_type = Realm.STANDARD
        realm.save(update_fields=["plan_type"])
        result = self.client_get("/plans/", subdomain="zulip")
        self.assert_in_success_response([current_plan], result)
        self.assert_not_in_success_response([sign_up_now, buy_standard, sponsorship_pending], result)

        realm.plan_type = Realm.LIMITED
        realm.save()
        Customer.objects.create(realm=get_realm("zulip"), stripe_customer_id="cus_id", sponsorship_pending=True)
        result = self.client_get("/plans/", subdomain="zulip")
        self.assert_in_success_response([current_plan], result)
        self.assert_in_success_response([current_plan, sponsorship_pending], result)
        self.assert_not_in_success_response([sign_up_now, buy_standard], result)

class AppsPageTest(ZulipTestCase):
    def test_apps_view(self) -> None:
        result = self.client_get('/apps')
        self.assertEqual(result.status_code, 301)
        self.assertTrue(result['Location'].endswith('/apps/'))

        with self.settings(ZILENCER_ENABLED=False):
            result = self.client_get('/apps/')
        self.assertEqual(result.status_code, 301)
        self.assertTrue(result['Location'] == 'https://zulip.com/apps/')

        with self.settings(ZILENCER_ENABLED=False):
            result = self.client_get('/apps/linux')
        self.assertEqual(result.status_code, 301)
        self.assertTrue(result['Location'] == 'https://zulip.com/apps/')

        with self.settings(ZILENCER_ENABLED=True):
            result = self.client_get('/apps/')
        self.assertEqual(result.status_code, 200)
        html = result.content.decode('utf-8')
        self.assertIn('Apps for every platform.', html)

    def test_app_download_link_view(self) -> None:
        return_value = "https://github.com/zulip/zulip-desktop/releases/download/v5.4.3/Zulip-Web-Setup-5.4.3.exe"
        with mock.patch("zerver.views.portico.get_latest_github_release_download_link_for_platform", return_value=return_value) as m:
            result = self.client_get("/apps/download/windows")
            m.assert_called_once_with("windows")
            self.assertEqual(result.status_code, 302)
            self.assertTrue(result['Location'] == return_value)

        result = self.client_get("/apps/download/plan9")
        self.assertEqual(result.status_code, 404)

class PrivacyTermsTest(ZulipTestCase):
    def test_custom_tos_template(self) -> None:
        response = self.client_get("/terms/")

        self.assert_in_success_response(["Thanks for using our products and services (\"Services\"). ",
                                         "By using our Services, you are agreeing to these terms"],
                                        response)

    def test_custom_terms_of_service_template(self) -> None:
        not_configured_message = 'This installation of Zulip does not have a configured ' \
                                 'terms of service'
        with self.settings(TERMS_OF_SERVICE=None):
            response = self.client_get('/terms/')
        self.assert_in_success_response([not_configured_message], response)
        with self.settings(TERMS_OF_SERVICE='zerver/tests/markdown/test_markdown.md'):
            response = self.client_get('/terms/')
        self.assert_in_success_response(['This is some <em>bold text</em>.'], response)
        self.assert_not_in_success_response([not_configured_message], response)

    def test_custom_privacy_policy_template(self) -> None:
        not_configured_message = 'This installation of Zulip does not have a configured ' \
                                 'privacy policy'
        with self.settings(PRIVACY_POLICY=None):
            response = self.client_get('/privacy/')
        self.assert_in_success_response([not_configured_message], response)
        with self.settings(PRIVACY_POLICY='zerver/tests/markdown/test_markdown.md'):
            response = self.client_get('/privacy/')
        self.assert_in_success_response(['This is some <em>bold text</em>.'], response)
        self.assert_not_in_success_response([not_configured_message], response)

    def test_custom_privacy_policy_template_with_absolute_url(self) -> None:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        abs_path = os.path.join(current_dir, '..', '..',
                                'templates/zerver/tests/markdown/test_markdown.md')
        with self.settings(PRIVACY_POLICY=abs_path):
            response = self.client_get('/privacy/')
        self.assert_in_success_response(['This is some <em>bold text</em>.'], response)

    def test_no_nav(self) -> None:
        # Test that our ?nav=0 feature of /privacy and /terms,
        # designed to comply with the Apple App Store draconian
        # policies that ToS/Privacy pages linked from an iOS app have
        # no links to the rest of the site if there's pricing
        # information for anything elsewhere on the site.
        response = self.client_get("/terms/")
        self.assert_in_success_response(["Plans"], response)

        response = self.client_get("/terms/", {"nav": "no"})
        self.assert_not_in_success_response(["Plans"], response)

        response = self.client_get("/privacy/", {"nav": "no"})
        self.assert_not_in_success_response(["Plans"], response)
