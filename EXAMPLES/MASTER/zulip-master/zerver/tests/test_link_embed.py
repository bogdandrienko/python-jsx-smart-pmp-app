from typing import Any, Callable, Dict, Optional
from unittest import mock

import orjson
from django.test import override_settings
from django.utils.html import escape
from requests.exceptions import ConnectionError

from zerver.lib.actions import queue_json_publish
from zerver.lib.cache import NotFoundInCache, cache_set, preview_url_cache_key
from zerver.lib.test_classes import ZulipTestCase
from zerver.lib.test_helpers import MockPythonResponse, mock_queue_publish
from zerver.lib.url_preview.oembed import get_oembed_data, strip_cdata
from zerver.lib.url_preview.parsers import GenericParser, OpenGraphParser
from zerver.lib.url_preview.preview import get_link_embed_data, link_embed_data_from_cache
from zerver.models import Message, Realm, UserProfile
from zerver.worker.queue_processors import FetchLinksEmbedData

TEST_CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'default',
    },
    'database': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'url-preview',
    },
    'in-memory': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'url-preview',
    },
}

@override_settings(INLINE_URL_EMBED_PREVIEW=True)
class OembedTestCase(ZulipTestCase):
    @mock.patch('pyoembed.requests.get')
    def test_present_provider(self, get: Any) -> None:
        get.return_value = response = mock.Mock()
        response.headers = {'content-type': 'application/json'}
        response.ok = True
        response_data = {
            'type': 'rich',
            'thumbnail_url': 'https://scontent.cdninstagram.com/t51.2885-15/n.jpg',
            'thumbnail_width': 640,
            'thumbnail_height': 426,
            'title': 'NASA',
            'html': '<p>test</p>',
            'version': '1.0',
            'width': 658,
            'height': 400}
        response.text = orjson.dumps(response_data).decode()
        url = 'http://instagram.com/p/BLtI2WdAymy'
        data = get_oembed_data(url)
        self.assertIsInstance(data, dict)
        self.assertIn('title', data)
        assert data is not None  # allow mypy to infer data is indexable
        self.assertEqual(data['title'], response_data['title'])

    @mock.patch('pyoembed.requests.get')
    def test_photo_provider(self, get: Any) -> None:
        get.return_value = response = mock.Mock()
        response.headers = {'content-type': 'application/json'}
        response.ok = True
        response_data = {
            'type': 'photo',
            'thumbnail_url': 'https://scontent.cdninstagram.com/t51.2885-15/n.jpg',
            'url': 'https://scontent.cdninstagram.com/t51.2885-15/n.jpg',
            'thumbnail_width': 640,
            'thumbnail_height': 426,
            'title': 'NASA',
            'html': '<p>test</p>',
            'version': '1.0',
            'width': 658,
            'height': 400}
        response.text = orjson.dumps(response_data).decode()
        url = 'http://imgur.com/photo/158727223'
        data = get_oembed_data(url)
        self.assertIsInstance(data, dict)
        self.assertIn('title', data)
        assert data is not None  # allow mypy to infer data is indexable
        self.assertEqual(data['title'], response_data['title'])
        self.assertTrue(data['oembed'])

    @mock.patch('pyoembed.requests.get')
    def test_video_provider(self, get: Any) -> None:
        get.return_value = response = mock.Mock()
        response.headers = {'content-type': 'application/json'}
        response.ok = True
        response_data = {
            'type': 'video',
            'thumbnail_url': 'https://scontent.cdninstagram.com/t51.2885-15/n.jpg',
            'thumbnail_width': 640,
            'thumbnail_height': 426,
            'title': 'NASA',
            'html': '<p>test</p>',
            'version': '1.0',
            'width': 658,
            'height': 400}
        response.text = orjson.dumps(response_data).decode()
        url = 'http://blip.tv/video/158727223'
        data = get_oembed_data(url)
        self.assertIsInstance(data, dict)
        self.assertIn('title', data)
        assert data is not None  # allow mypy to infer data is indexable
        self.assertEqual(data['title'], response_data['title'])

    @mock.patch('pyoembed.requests.get')
    def test_error_request(self, get: Any) -> None:
        get.return_value = response = mock.Mock()
        response.ok = False
        url = 'http://instagram.com/p/BLtI2WdAymy'
        data = get_oembed_data(url)
        self.assertIsNone(data)

    @mock.patch('pyoembed.requests.get')
    def test_invalid_json_in_response(self, get: Any) -> None:
        get.return_value = response = mock.Mock()
        response.headers = {'content-type': 'application/json'}
        response.ok = True
        response.text = '{invalid json}'
        url = 'http://instagram.com/p/BLtI2WdAymy'
        data = get_oembed_data(url)
        self.assertIsNone(data)

    def test_oembed_html(self) -> None:
        html = '<iframe src="//www.instagram.com/embed.js"></iframe>'
        stripped_html = strip_cdata(html)
        self.assertEqual(html, stripped_html)

    def test_autodiscovered_oembed_xml_format_html(self) -> None:
        iframe_content = '<iframe src="https://w.soundcloud.com/player"></iframe>'
        html = f'<![CDATA[{iframe_content}]]>'
        stripped_html = strip_cdata(html)
        self.assertEqual(iframe_content, stripped_html)


class OpenGraphParserTestCase(ZulipTestCase):
    def test_page_with_og(self) -> None:
        html = b"""<html>
          <head>
          <meta property="og:title" content="The Rock" />
          <meta property="og:type" content="video.movie" />
          <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
          <meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
          <meta property="og:description" content="The Rock film" />
          </head>
        </html>"""

        parser = OpenGraphParser(html, "text/html; charset=UTF-8")
        result = parser.extract_data()
        self.assertIn('title', result)
        self.assertEqual(result['title'], 'The Rock')
        self.assertEqual(result.get('description'), 'The Rock film')

    def test_page_with_evil_og_tags(self) -> None:
        html = b"""<html>
          <head>
          <meta property="og:title" content="The Rock" />
          <meta property="og:type" content="video.movie" />
          <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
          <meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
          <meta property="og:description" content="The Rock film" />
          <meta property="og:html" content="<script>alert(window.location)</script>" />
          <meta property="og:oembed" content="True" />
          </head>
        </html>"""

        parser = OpenGraphParser(html, "text/html; charset=UTF-8")
        result = parser.extract_data()
        self.assertIn('title', result)
        self.assertEqual(result['title'], 'The Rock')
        self.assertEqual(result.get('description'), 'The Rock film')
        self.assertEqual(result.get('oembed'), None)
        self.assertEqual(result.get('html'), None)

    def test_charset_in_header(self) -> None:
        html = """<html>
          <head>
            <meta property="og:title" content="中文" />
          </head>
        </html>""".encode("big5")
        parser = OpenGraphParser(html, "text/html; charset=Big5")
        result = parser.extract_data()
        self.assertEqual(result["title"], "中文")

    def test_charset_in_meta(self) -> None:
        html = """<html>
          <head>
            <meta content-type="text/html; charset=Big5" />
            <meta property="og:title" content="中文" />
          </head>
        </html>""".encode("big5")
        parser = OpenGraphParser(html, "text/html")
        result = parser.extract_data()
        self.assertEqual(result["title"], "中文")

class GenericParserTestCase(ZulipTestCase):
    def test_parser(self) -> None:
        html = b"""
          <html>
            <head><title>Test title</title></head>
            <body>
                <h1>Main header</h1>
                <p>Description text</p>
            </body>
          </html>
        """
        parser = GenericParser(html, "text/html; charset=UTF-8")
        result = parser.extract_data()
        self.assertEqual(result.get('title'), 'Test title')
        self.assertEqual(result.get('description'), 'Description text')

    def test_extract_image(self) -> None:
        html = b"""
          <html>
            <body>
                <h1>Main header</h1>
                <img data-src="Not an image">
                <img src="http://test.com/test.jpg">
                <div>
                    <p>Description text</p>
                </div>
            </body>
          </html>
        """
        parser = GenericParser(html, "text/html; charset=UTF-8")
        result = parser.extract_data()
        self.assertEqual(result.get('title'), 'Main header')
        self.assertEqual(result.get('description'), 'Description text')
        self.assertEqual(result.get('image'), 'http://test.com/test.jpg')

    def test_extract_description(self) -> None:
        html = b"""
          <html>
            <body>
                <div>
                    <div>
                        <p>Description text</p>
                    </div>
                </div>
            </body>
          </html>
        """
        parser = GenericParser(html, "text/html; charset=UTF-8")
        result = parser.extract_data()
        self.assertEqual(result.get('description'), 'Description text')

        html = b"""
          <html>
            <head><meta name="description" content="description 123"</head>
            <body></body>
          </html>
        """
        parser = GenericParser(html, "text/html; charset=UTF-8")
        result = parser.extract_data()
        self.assertEqual(result.get('description'), 'description 123')

        html = b"<html><body></body></html>"
        parser = GenericParser(html, "text/html; charset=UTF-8")
        result = parser.extract_data()
        self.assertIsNone(result.get('description'))


class PreviewTestCase(ZulipTestCase):
    open_graph_html = """
          <html>
            <head>
                <title>Test title</title>
                <meta property="og:title" content="The Rock" />
                <meta property="og:type" content="video.movie" />
                <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
                <meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
                <meta http-equiv="refresh" content="30" />
                <meta property="notog:extra-text" content="Extra!" />
            </head>
            <body>
                <h1>Main header</h1>
                <p>Description text</p>
            </body>
          </html>
        """

    def setUp(self) -> None:
        super().setUp()
        Realm.objects.all().update(inline_url_embed_preview=True)

    @classmethod
    def create_mock_response(cls, url: str, relative_url: bool=False,
                             headers: Optional[Dict[str, str]]=None,
                             html: Optional[str]=None) -> Callable[..., MockPythonResponse]:
        if html is None:
            html = cls.open_graph_html
        if relative_url is True:
            html = html.replace('http://ia.media-imdb.com', '')
        response = MockPythonResponse(html, 200, headers)
        return lambda k, **kwargs: {url: response}.get(k, MockPythonResponse('', 404, headers))

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_edit_message_history(self) -> None:
        user = self.example_user('hamlet')
        self.login_user(user)
        msg_id = self.send_stream_message(user, "Scotland",
                                          topic_name="editing", content="original")

        url = 'http://test.org/'
        mocked_response = mock.Mock(side_effect=self.create_mock_response(url))

        with mock_queue_publish('zerver.views.message_edit.queue_json_publish') as patched:
            result = self.client_patch("/json/messages/" + str(msg_id), {
                'message_id': msg_id, 'content': url,
            })
            self.assert_json_success(result)
            patched.assert_called_once()
            queue = patched.call_args[0][0]
            self.assertEqual(queue, "embed_links")
            event = patched.call_args[0][1]

        with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mocked_response), self.assertLogs(level='INFO') as info_logs:
                FetchLinksEmbedData().consume(event)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://test.org/: ' in info_logs.output[0]
            )

        embedded_link = f'<a href="{url}" title="The Rock">The Rock</a>'
        msg = Message.objects.select_related("sender").get(id=msg_id)
        self.assertIn(embedded_link, msg.rendered_content)

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def _send_message_with_test_org_url(self, sender: UserProfile, queue_should_run: bool=True,
                                        relative_url: bool=False) -> Message:
        url = 'http://test.org/'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish') as patched:
            msg_id = self.send_personal_message(
                sender,
                self.example_user('cordelia'),
                content=url,
            )
            if queue_should_run:
                patched.assert_called_once()
                queue = patched.call_args[0][0]
                self.assertEqual(queue, "embed_links")
                event = patched.call_args[0][1]
            else:
                patched.assert_not_called()
                # If we nothing was put in the queue, we don't need to
                # run the queue processor or any of the following code
                return Message.objects.select_related("sender").get(id=msg_id)

        # Verify the initial message doesn't have the embedded links rendered
        msg = Message.objects.select_related("sender").get(id=msg_id)
        self.assertNotIn(
            f'<a href="{url}" title="The Rock">The Rock</a>',
            msg.rendered_content)

        # Mock the network request result so the test can be fast without Internet
        mocked_response = mock.Mock(side_effect=self.create_mock_response(url, relative_url=relative_url))

        # Run the queue processor to potentially rerender things
        with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mocked_response), self.assertLogs(level='INFO') as info_logs:
                FetchLinksEmbedData().consume(event)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://test.org/: ' in info_logs.output[0]
            )

        msg = Message.objects.select_related("sender").get(id=msg_id)
        return msg

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_message_update_race_condition(self) -> None:
        user = self.example_user('hamlet')
        self.login_user(user)
        original_url = 'http://test.org/'
        edited_url = 'http://edited.org/'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish') as patched:
            msg_id = self.send_stream_message(user, "Scotland",
                                              topic_name="foo", content=original_url)
            patched.assert_called_once()
            queue = patched.call_args[0][0]
            self.assertEqual(queue, "embed_links")
            event = patched.call_args[0][1]

        def wrapped_queue_json_publish(*args: Any, **kwargs: Any) -> None:
            # Mock the network request result so the test can be fast without Internet
            mocked_response_original = mock.Mock(side_effect=self.create_mock_response(original_url))
            mocked_response_edited = mock.Mock(side_effect=self.create_mock_response(edited_url))

            with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
                with mock.patch('requests.get', mocked_response_original), self.assertLogs(level='INFO') as info_logs:
                    # Run the queue processor. This will simulate the event for original_url being
                    # processed after the message has been edited.
                    FetchLinksEmbedData().consume(event)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://test.org/: ' in info_logs.output[0]
            )
            msg = Message.objects.select_related("sender").get(id=msg_id)
            # The content of the message has changed since the event for original_url has been created,
            # it should not be rendered. Another, up-to-date event will have been sent (edited_url).
            self.assertNotIn(f'<a href="{original_url}" title="The Rock">The Rock</a>',
                             msg.rendered_content)
            mocked_response_edited.assert_not_called()

            with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
                with mock.patch('requests.get', mocked_response_edited), self.assertLogs(level='INFO') as info_logs:
                    # Now proceed with the original queue_json_publish and call the
                    # up-to-date event for edited_url.
                    queue_json_publish(*args, **kwargs)
                    msg = Message.objects.select_related("sender").get(id=msg_id)
                    self.assertIn(f'<a href="{edited_url}" title="The Rock">The Rock</a>',
                                  msg.rendered_content)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://edited.org/: ' in info_logs.output[0]
            )

        with mock_queue_publish('zerver.views.message_edit.queue_json_publish', wraps=wrapped_queue_json_publish):
            result = self.client_patch("/json/messages/" + str(msg_id), {
                'message_id': msg_id, 'content': edited_url,
            })
            self.assert_json_success(result)

    def test_get_link_embed_data(self) -> None:
        url = 'http://test.org/'
        embedded_link = f'<a href="{url}" title="The Rock">The Rock</a>'

        # When humans send, we should get embedded content.
        msg = self._send_message_with_test_org_url(sender=self.example_user('hamlet'))
        self.assertIn(embedded_link, msg.rendered_content)

        # We don't want embedded content for bots.
        msg = self._send_message_with_test_org_url(sender=self.example_user('webhook_bot'),
                                                   queue_should_run=False)
        self.assertNotIn(embedded_link, msg.rendered_content)

        # Try another human to make sure bot failure was due to the
        # bot sending the message and not some other reason.
        msg = self._send_message_with_test_org_url(sender=self.example_user('prospero'))
        self.assertIn(embedded_link, msg.rendered_content)

    def test_inline_url_embed_preview(self) -> None:
        with_preview = '<p><a href="http://test.org/">http://test.org/</a></p>\n<div class="message_embed"><a class="message_embed_image" href="http://test.org/" style="background-image: url(http://ia.media-imdb.com/images/rock.jpg)"></a><div class="data-container"><div class="message_embed_title"><a href="http://test.org/" title="The Rock">The Rock</a></div><div class="message_embed_description">Description text</div></div></div>'
        without_preview = '<p><a href="http://test.org/">http://test.org/</a></p>'
        msg = self._send_message_with_test_org_url(sender=self.example_user('hamlet'))
        self.assertEqual(msg.rendered_content, with_preview)

        realm = msg.get_realm()
        setattr(realm, 'inline_url_embed_preview', False)
        realm.save()

        msg = self._send_message_with_test_org_url(sender=self.example_user('prospero'), queue_should_run=False)
        self.assertEqual(msg.rendered_content, without_preview)

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_inline_relative_url_embed_preview(self) -> None:
        # Relative URLs should not be sent for URL preview.
        with mock_queue_publish('zerver.lib.actions.queue_json_publish') as patched:
            self.send_personal_message(
                self.example_user('prospero'),
                self.example_user('cordelia'),
                content="http://zulip.testserver/api/",
            )
            patched.assert_not_called()

    def test_inline_url_embed_preview_with_relative_image_url(self) -> None:
        with_preview_relative = '<p><a href="http://test.org/">http://test.org/</a></p>\n<div class="message_embed"><a class="message_embed_image" href="http://test.org/" style="background-image: url(http://test.org/images/rock.jpg)"></a><div class="data-container"><div class="message_embed_title"><a href="http://test.org/" title="The Rock">The Rock</a></div><div class="message_embed_description">Description text</div></div></div>'
        # Try case where the Open Graph image is a relative URL.
        msg = self._send_message_with_test_org_url(sender=self.example_user('prospero'), relative_url=True)
        self.assertEqual(msg.rendered_content, with_preview_relative)

    def test_http_error_get_data(self) -> None:
        url = 'http://test.org/'
        msg_id = self.send_personal_message(
            self.example_user('hamlet'),
            self.example_user('cordelia'),
            content=url,
        )
        msg = Message.objects.select_related("sender").get(id=msg_id)
        event = {
            'message_id': msg_id,
            'urls': [url],
            'message_realm_id': msg.sender.realm_id,
            'message_content': url}
        with self.settings(INLINE_URL_EMBED_PREVIEW=True, TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mock.Mock(side_effect=ConnectionError())), \
                    self.assertLogs(level='INFO') as info_logs:
                FetchLinksEmbedData().consume(event)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://test.org/: ' in info_logs.output[0]
            )

        msg = Message.objects.get(id=msg_id)
        self.assertEqual(
            '<p><a href="http://test.org/">http://test.org/</a></p>',
            msg.rendered_content)

    def test_invalid_link(self) -> None:
        with self.settings(INLINE_URL_EMBED_PREVIEW=True, TEST_SUITE=False, CACHES=TEST_CACHES):
            self.assertIsNone(get_link_embed_data('com.notvalidlink'))
            self.assertIsNone(get_link_embed_data('μένει.com.notvalidlink'))

    def test_link_embed_data_from_cache(self) -> None:
        url = 'http://test.org/'
        link_embed_data = 'test data'

        with self.assertRaises(NotFoundInCache):
            link_embed_data_from_cache(url)

        with self.settings(CACHES=TEST_CACHES):
            key = preview_url_cache_key(url)
            cache_set(key, link_embed_data, 'database')
            self.assertEqual(link_embed_data, link_embed_data_from_cache(url))

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_link_preview_non_html_data(self) -> None:
        user = self.example_user('hamlet')
        self.login_user(user)
        url = 'http://test.org/audio.mp3'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish') as patched:
            msg_id = self.send_stream_message(user, "Scotland", topic_name="foo", content=url)
            patched.assert_called_once()
            queue = patched.call_args[0][0]
            self.assertEqual(queue, "embed_links")
            event = patched.call_args[0][1]

        headers = {'content-type': 'application/octet-stream'}
        mocked_response = mock.Mock(side_effect=self.create_mock_response(url, headers=headers))

        with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mocked_response), self.assertLogs(level='INFO') as info_logs:
                FetchLinksEmbedData().consume(event)
                cached_data = link_embed_data_from_cache(url)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://test.org/audio.mp3: ' in info_logs.output[0]
            )

        self.assertIsNone(cached_data)
        msg = Message.objects.select_related("sender").get(id=msg_id)
        self.assertEqual(
            ('<p><a href="http://test.org/audio.mp3">'
             'http://test.org/audio.mp3</a></p>'),
            msg.rendered_content)

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_link_preview_no_open_graph_image(self) -> None:
        user = self.example_user('hamlet')
        self.login_user(user)
        url = 'http://test.org/foo.html'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish') as patched:
            msg_id = self.send_stream_message(user, "Scotland", topic_name="foo", content=url)
            patched.assert_called_once()
            queue = patched.call_args[0][0]
            self.assertEqual(queue, "embed_links")
            event = patched.call_args[0][1]

        # HTML without the og:image metadata
        html = '\n'.join(line for line in self.open_graph_html.splitlines() if 'og:image' not in line)
        mocked_response = mock.Mock(side_effect=self.create_mock_response(url, html=html))
        with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mocked_response), self.assertLogs(level='INFO') as info_logs:
                FetchLinksEmbedData().consume(event)
                cached_data = link_embed_data_from_cache(url)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://test.org/foo.html: ' in info_logs.output[0]
            )

        self.assertIn('title', cached_data)
        self.assertNotIn('image', cached_data)
        msg = Message.objects.select_related("sender").get(id=msg_id)
        self.assertEqual(
            ('<p><a href="http://test.org/foo.html">'
             'http://test.org/foo.html</a></p>'),
            msg.rendered_content)

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_link_preview_open_graph_image_missing_content(self) -> None:
        user = self.example_user('hamlet')
        self.login_user(user)
        url = 'http://test.org/foo.html'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish') as patched:
            msg_id = self.send_stream_message(user, "Scotland", topic_name="foo", content=url)
            patched.assert_called_once()
            queue = patched.call_args[0][0]
            self.assertEqual(queue, "embed_links")
            event = patched.call_args[0][1]

        # HTML without the og:image metadata
        html = '\n'.join(line if 'og:image' not in line else '<meta property="og:image"/>'
                         for line in self.open_graph_html.splitlines())
        mocked_response = mock.Mock(side_effect=self.create_mock_response(url, html=html))
        with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mocked_response), self.assertLogs(level='INFO') as info_logs:
                FetchLinksEmbedData().consume(event)
                cached_data = link_embed_data_from_cache(url)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://test.org/foo.html: ' in info_logs.output[0]
            )

        self.assertIn('title', cached_data)
        self.assertNotIn('image', cached_data)
        msg = Message.objects.select_related("sender").get(id=msg_id)
        self.assertEqual(
            ('<p><a href="http://test.org/foo.html">'
             'http://test.org/foo.html</a></p>'),
            msg.rendered_content)

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_link_preview_no_content_type_header(self) -> None:
        user = self.example_user('hamlet')
        self.login_user(user)
        url = 'http://test.org/'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish') as patched:
            msg_id = self.send_stream_message(user, "Scotland", topic_name="foo", content=url)
            patched.assert_called_once()
            queue = patched.call_args[0][0]
            self.assertEqual(queue, "embed_links")
            event = patched.call_args[0][1]

        headers = {'content-type': ''}  # No content type header
        mocked_response = mock.Mock(side_effect=self.create_mock_response(url, headers=headers))
        with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mocked_response), self.assertLogs(level='INFO') as info_logs:
                FetchLinksEmbedData().consume(event)
                data = link_embed_data_from_cache(url)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://test.org/: ' in info_logs.output[0]
            )

        self.assertIn('title', data)
        self.assertIn('image', data)

        msg = Message.objects.select_related("sender").get(id=msg_id)
        self.assertIn(data['title'], msg.rendered_content)
        self.assertIn(data['image'], msg.rendered_content)

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_valid_content_type_error_get_data(self) -> None:
        url = 'http://test.org/'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish'):
            msg_id = self.send_personal_message(
                self.example_user('hamlet'),
                self.example_user('cordelia'),
                content=url,
            )
        msg = Message.objects.select_related("sender").get(id=msg_id)
        event = {
            'message_id': msg_id,
            'urls': [url],
            'message_realm_id': msg.sender.realm_id,
            'message_content': url}

        with mock.patch('zerver.lib.url_preview.preview.get_oembed_data', side_effect=lambda *args, **kwargs: None):
            with mock.patch('zerver.lib.url_preview.preview.valid_content_type', side_effect=lambda k: True):
                with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
                    with mock.patch('requests.get', mock.Mock(side_effect=ConnectionError())), \
                            self.assertLogs(level='INFO') as info_logs:
                        FetchLinksEmbedData().consume(event)
                    self.assertTrue(
                        'INFO:root:Time spent on get_link_embed_data for http://test.org/: ' in info_logs.output[0]
                    )

                    with self.assertRaises(NotFoundInCache):
                        link_embed_data_from_cache(url)

        msg.refresh_from_db()
        self.assertEqual(
            '<p><a href="http://test.org/">http://test.org/</a></p>',
            msg.rendered_content)

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_invalid_url(self) -> None:
        url = 'http://test.org/'
        error_url = 'http://test.org/x'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish'):
            msg_id = self.send_personal_message(
                self.example_user('hamlet'),
                self.example_user('cordelia'),
                content=error_url,
            )
        msg = Message.objects.select_related("sender").get(id=msg_id)
        event = {
            'message_id': msg_id,
            'urls': [error_url],
            'message_realm_id': msg.sender.realm_id,
            'message_content': error_url}

        mocked_response = mock.Mock(side_effect=self.create_mock_response(url))
        with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mocked_response), self.assertLogs(level='INFO') as info_logs:
                FetchLinksEmbedData().consume(event)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://test.org/x: ' in info_logs.output[0]
            )
            cached_data = link_embed_data_from_cache(error_url)

        # FIXME: Should we really cache this, especially without cache invalidation?
        self.assertIsNone(cached_data)
        msg.refresh_from_db()
        self.assertEqual(
            '<p><a href="http://test.org/x">http://test.org/x</a></p>',
            msg.rendered_content)

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_safe_oembed_html_url(self) -> None:
        url = 'http://test.org/'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish'):
            msg_id = self.send_personal_message(
                self.example_user('hamlet'),
                self.example_user('cordelia'),
                content=url,
            )
        msg = Message.objects.select_related("sender").get(id=msg_id)
        event = {
            'message_id': msg_id,
            'urls': [url],
            'message_realm_id': msg.sender.realm_id,
            'message_content': url}

        mocked_data = {'html': f'<iframe src="{url}"></iframe>',
                       'oembed': True, 'type': 'video', 'image': f'{url}/image.png'}
        mocked_response = mock.Mock(side_effect=self.create_mock_response(url))
        with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mocked_response), self.assertLogs(level='INFO') as info_logs:
                with mock.patch('zerver.lib.url_preview.preview.get_oembed_data',
                                lambda *args, **kwargs: mocked_data):
                    FetchLinksEmbedData().consume(event)
                    data = link_embed_data_from_cache(url)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for http://test.org/: ' in info_logs.output[0]
            )

        self.assertEqual(data, mocked_data)
        msg.refresh_from_db()
        self.assertIn('a data-id="{}"'.format(escape(mocked_data['html'])), msg.rendered_content)

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_youtube_url_title_replaces_url(self) -> None:
        url = 'https://www.youtube.com/watch?v=eSJTXC7Ixgg'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish'):
            msg_id = self.send_personal_message(
                self.example_user('hamlet'),
                self.example_user('cordelia'),
                content=url,
            )
        msg = Message.objects.select_related("sender").get(id=msg_id)
        event = {
            'message_id': msg_id,
            'urls': [url],
            'message_realm_id': msg.sender.realm_id,
            'message_content': url}

        mocked_data = {'title': 'Clearer Code at Scale - Static Types at Zulip and Dropbox'}
        mocked_response = mock.Mock(side_effect=self.create_mock_response(url))
        with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mocked_response), self.assertLogs(level='INFO') as info_logs:
                with mock.patch('zerver.lib.markdown.link_preview.link_embed_data_from_cache',
                                lambda *args, **kwargs: mocked_data):
                    FetchLinksEmbedData().consume(event)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for https://www.youtube.com/watch?v=eSJTXC7Ixgg:' in info_logs.output[0]
            )

        msg.refresh_from_db()
        expected_content = '<p><a href="https://www.youtube.com/watch?v=eSJTXC7Ixgg">YouTube - Clearer Code at Scale - Static Types at Zulip and Dropbox</a></p>\n<div class="youtube-video message_inline_image"><a data-id="eSJTXC7Ixgg" href="https://www.youtube.com/watch?v=eSJTXC7Ixgg"><img src="https://i.ytimg.com/vi/eSJTXC7Ixgg/default.jpg"></a></div>'
        self.assertEqual(expected_content, msg.rendered_content)

    @override_settings(INLINE_URL_EMBED_PREVIEW=True)
    def test_custom_title_replaces_youtube_url_title(self) -> None:
        url = '[YouTube link](https://www.youtube.com/watch?v=eSJTXC7Ixgg)'
        with mock_queue_publish('zerver.lib.actions.queue_json_publish'):
            msg_id = self.send_personal_message(
                self.example_user('hamlet'),
                self.example_user('cordelia'),
                content=url,
            )
        msg = Message.objects.select_related("sender").get(id=msg_id)
        event = {
            'message_id': msg_id,
            'urls': [url],
            'message_realm_id': msg.sender.realm_id,
            'message_content': url}

        mocked_data = {'title': 'Clearer Code at Scale - Static Types at Zulip and Dropbox'}
        mocked_response = mock.Mock(side_effect=self.create_mock_response(url))
        with self.settings(TEST_SUITE=False, CACHES=TEST_CACHES):
            with mock.patch('requests.get', mocked_response), self.assertLogs(level='INFO') as info_logs:
                with mock.patch('zerver.lib.markdown.link_preview.link_embed_data_from_cache',
                                lambda *args, **kwargs: mocked_data):
                    FetchLinksEmbedData().consume(event)
            self.assertTrue(
                'INFO:root:Time spent on get_link_embed_data for [YouTube link](https://www.youtube.com/watch?v=eSJTXC7Ixgg):' in info_logs.output[0]
            )

        msg.refresh_from_db()
        expected_content = '<p><a href="https://www.youtube.com/watch?v=eSJTXC7Ixgg">YouTube link</a></p>\n<div class="youtube-video message_inline_image"><a data-id="eSJTXC7Ixgg" href="https://www.youtube.com/watch?v=eSJTXC7Ixgg"><img src="https://i.ytimg.com/vi/eSJTXC7Ixgg/default.jpg"></a></div>'
        self.assertEqual(expected_content, msg.rendered_content)
