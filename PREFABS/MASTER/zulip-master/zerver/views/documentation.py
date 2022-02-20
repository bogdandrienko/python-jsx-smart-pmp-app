import os
import random
import re
from collections import OrderedDict
from typing import Any, Dict, Tuple

from django.conf import settings
from django.http import HttpRequest, HttpResponse, HttpResponseNotFound
from django.template import loader
from django.views.generic import TemplateView

from zerver.context_processors import zulip_default_context
from zerver.decorator import add_google_analytics_context
from zerver.lib.integrations import CATEGORIES, INTEGRATIONS, HubotIntegration, WebhookIntegration
from zerver.lib.request import REQ, has_request_variables
from zerver.lib.subdomains import get_subdomain
from zerver.models import Realm
from zerver.templatetags.app_filters import render_markdown_path


def add_api_uri_context(context: Dict[str, Any], request: HttpRequest) -> None:
    context.update(zulip_default_context(request))

    subdomain = get_subdomain(request)
    if (subdomain != Realm.SUBDOMAIN_FOR_ROOT_DOMAIN
            or not settings.ROOT_DOMAIN_LANDING_PAGE):
        display_subdomain = subdomain
        html_settings_links = True
    else:
        display_subdomain = 'yourZulipDomain'
        html_settings_links = False

    display_host = Realm.host_for_subdomain(display_subdomain)
    api_url_scheme_relative = display_host + "/api"
    api_url = settings.EXTERNAL_URI_SCHEME + api_url_scheme_relative
    zulip_url = settings.EXTERNAL_URI_SCHEME + display_host

    context['external_uri_scheme'] = settings.EXTERNAL_URI_SCHEME
    context['api_url'] = api_url
    context['api_url_scheme_relative'] = api_url_scheme_relative
    context['zulip_url'] = zulip_url

    context["html_settings_links"] = html_settings_links
    if html_settings_links:
        settings_html = '<a href="/#settings">Zulip settings page</a>'
        subscriptions_html = '<a target="_blank" href="/#streams">streams page</a>'
    else:
        settings_html = 'Zulip settings page'
        subscriptions_html = 'streams page'
    context['settings_html'] = settings_html
    context['subscriptions_html'] = subscriptions_html

class ApiURLView(TemplateView):
    def get_context_data(self, **kwargs: Any) -> Dict[str, str]:
        context = super().get_context_data(**kwargs)
        add_api_uri_context(context, self.request)
        return context


class MarkdownDirectoryView(ApiURLView):
    path_template = ""

    def get_path(self, article: str) -> Tuple[str, int]:
        http_status = 200
        if article == "":
            article = "index"
        elif article == "include/sidebar_index":
            pass
        elif "/" in article:
            article = "missing"
            http_status = 404
        elif len(article) > 100 or not re.match('^[0-9a-zA-Z_-]+$', article):
            article = "missing"
            http_status = 404

        path = self.path_template % (article,)
        try:
            loader.get_template(path)
            return (path, http_status)
        except loader.TemplateDoesNotExist:
            return (self.path_template % ("missing",), 404)

    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
        article = kwargs["article"]
        context: Dict[str, Any] = super().get_context_data()
        (context["article"], http_status_ignored) = self.get_path(article)

        # For disabling the "Back to home" on the homepage
        context["not_index_page"] = not context["article"].endswith("/index.md")
        if self.path_template == '/zerver/help/%s.md':
            context["page_is_help_center"] = True
            context["doc_root"] = "/help/"
            (sidebar_index, http_status_ignored) = self.get_path("include/sidebar_index")
            title_base = "Zulip Help Center"
        else:
            context["page_is_api_center"] = True
            context["doc_root"] = "/api/"
            (sidebar_index, http_status_ignored) = self.get_path("sidebar_index")
            title_base = "Zulip API documentation"

        # The following is a somewhat hacky approach to extract titles from articles.
        # Hack: `context["article"] has a leading `/`, so we use + to add directories.
        article_path = os.path.join(settings.DEPLOY_ROOT, 'templates') + context["article"]
        if os.path.exists(article_path):
            with open(article_path) as article_file:
                first_line = article_file.readlines()[0]
            # Strip the header and then use the first line to get the article title
            article_title = first_line.lstrip("#").strip()
            if context["not_index_page"]:
                context["OPEN_GRAPH_TITLE"] = f"{article_title} ({title_base})"
            else:
                context["OPEN_GRAPH_TITLE"] = title_base
            self.request.placeholder_open_graph_description = (
                f"REPLACMENT_OPEN_GRAPH_DESCRIPTION_{int(2**24 * random.random())}")
            context["OPEN_GRAPH_DESCRIPTION"] = self.request.placeholder_open_graph_description

        context["sidebar_index"] = sidebar_index
        # An "article" might require the api_uri_context to be rendered
        api_uri_context: Dict[str, Any] = {}
        add_api_uri_context(api_uri_context, self.request)
        api_uri_context["run_content_validators"] = True
        context["api_uri_context"] = api_uri_context
        add_google_analytics_context(context)
        return context

    def get(self, request: HttpRequest, article: str="") -> HttpResponse:
        (path, http_status) = self.get_path(article)
        result = super().get(self, article=article)
        if http_status != 200:
            result.status_code = http_status
        return result

def add_integrations_context(context: Dict[str, Any]) -> None:
    alphabetical_sorted_categories = OrderedDict(sorted(CATEGORIES.items()))
    alphabetical_sorted_integration = OrderedDict(sorted(INTEGRATIONS.items()))
    enabled_integrations_count = len(list(filter(lambda v: v.is_enabled(), INTEGRATIONS.values())))
    # Subtract 1 so saying "Over X integrations" is correct. Then,
    # round down to the nearest multiple of 10.
    integrations_count_display = ((enabled_integrations_count - 1) // 10) * 10
    context['categories_dict'] = alphabetical_sorted_categories
    context['integrations_dict'] = alphabetical_sorted_integration
    context['integrations_count_display'] = integrations_count_display

def add_integrations_open_graph_context(context: Dict[str, Any], request: HttpRequest) -> None:
    path_name = request.path.rstrip('/').split('/')[-1]
    description = ('Zulip comes with over a hundred native integrations out of the box, '
                   'and integrates with Zapier, IFTTT, and Hubot to provide hundreds more. '
                   'Connect the apps you use everyday to Zulip.')

    if path_name in INTEGRATIONS:
        integration = INTEGRATIONS[path_name]
        context['OPEN_GRAPH_TITLE'] = f'Connect {integration.display_name} to Zulip'
        context['OPEN_GRAPH_DESCRIPTION'] = description

    elif path_name in CATEGORIES:
        category = CATEGORIES[path_name]
        context['OPEN_GRAPH_TITLE'] = f'Connect your {category} tools to Zulip'
        context['OPEN_GRAPH_DESCRIPTION'] = description

    elif path_name == 'integrations':
        context['OPEN_GRAPH_TITLE'] = 'Connect the tools you use to Zulip'
        context['OPEN_GRAPH_DESCRIPTION'] = description

class IntegrationView(ApiURLView):
    template_name = 'zerver/integrations/index.html'

    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
        context: Dict[str, Any] = super().get_context_data(**kwargs)
        add_integrations_context(context)
        add_integrations_open_graph_context(context, self.request)
        add_google_analytics_context(context)
        return context


@has_request_variables
def integration_doc(request: HttpRequest, integration_name: str=REQ()) -> HttpResponse:
    if not request.is_ajax():
        return HttpResponseNotFound()
    try:
        integration = INTEGRATIONS[integration_name]
    except KeyError:
        return HttpResponseNotFound()

    context: Dict[str, Any] = {}
    add_api_uri_context(context, request)

    context['integration_name'] = integration.name
    context['integration_display_name'] = integration.display_name
    context['recommended_stream_name'] = integration.stream_name
    if isinstance(integration, WebhookIntegration):
        context['integration_url'] = integration.url[3:]
    if isinstance(integration, HubotIntegration):
        context['hubot_docs_url'] = integration.hubot_docs_url

    doc_html_str = render_markdown_path(integration.doc, context)

    return HttpResponse(doc_html_str)
