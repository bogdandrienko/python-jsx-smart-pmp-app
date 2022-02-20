from zerver.lib.test_classes import WebhookTestCase


class WordPressHookTests(WebhookTestCase):
    STREAM_NAME = 'wordpress'
    URL_TEMPLATE = "/api/v1/external/wordpress?api_key={api_key}&stream={stream}"
    FIXTURE_DIR_NAME = 'wordpress'

    def test_publish_post(self) -> None:

        expected_topic = "WordPress Post"
        expected_message = "New post published:\n* [New Blog Post](http://example.com\n)"

        self.check_webhook(
            "publish_post",
            expected_topic,
            expected_message,
            content_type="application/x-www-form-urlencoded",
        )

    def test_publish_post_type_not_provided(self) -> None:

        expected_topic = "WordPress Post"
        expected_message = "New post published:\n* [New Blog Post](http://example.com\n)"

        self.check_webhook(
            "publish_post_type_not_provided",
            expected_topic,
            expected_message,
            content_type="application/x-www-form-urlencoded",
        )

    def test_publish_post_no_data_provided(self) -> None:

        # Note: the fixture includes 'hook=publish_post' because it's always added by HookPress
        expected_topic = "WordPress Notification"
        expected_message = "New post published:\n* [New WordPress Post](WordPress Post URL)"

        self.check_webhook(
            "publish_post_no_data_provided",
            expected_topic,
            expected_message,
            content_type="application/x-www-form-urlencoded",
        )

    def test_publish_page(self) -> None:

        expected_topic = "WordPress Page"
        expected_message = "New page published:\n* [New Blog Page](http://example.com\n)"

        self.check_webhook(
            "publish_page",
            expected_topic,
            expected_message,
            content_type="application/x-www-form-urlencoded",
        )

    def test_user_register(self) -> None:

        expected_topic = "New Blog Users"
        expected_message = "New blog user registered:\n* **Name**: test_user\n* **Email**: test_user@example.com"

        self.check_webhook(
            "user_register",
            expected_topic,
            expected_message,
            content_type="application/x-www-form-urlencoded",
        )

    def test_wp_login(self) -> None:

        expected_topic = "New Login"
        expected_message = "User testuser logged in."

        self.check_webhook(
            "wp_login",
            expected_topic,
            expected_message,
            content_type="application/x-www-form-urlencoded",
        )

    def test_unknown_action_no_data(self) -> None:

        # Mimic check_webhook() to manually execute a negative test.
        # Otherwise its call to send_webhook_payload() would assert on the non-success
        # we are testing. The value of result is the error message the webhook should
        # return if no params are sent. The fixture for this test is an empty file.

        # subscribe to the target stream
        self.subscribe(self.test_user, self.STREAM_NAME)

        # post to the webhook url
        post_params = {'stream_name': self.STREAM_NAME,
                       'content_type': 'application/x-www-form-urlencoded'}
        result = self.client_post(self.url, 'unknown_action', **post_params)

        # check that we got the expected error message
        self.assert_json_error(result, "Unknown WordPress webhook action: WordPress Action")

    def test_unknown_action_no_hook_provided(self) -> None:

        # Similar to unknown_action_no_data, except the fixture contains valid blog post
        # params but without the hook parameter. This should also return an error.

        self.subscribe(self.test_user, self.STREAM_NAME)
        post_params = {'stream_name': self.STREAM_NAME,
                       'content_type': 'application/x-www-form-urlencoded'}
        result = self.client_post(self.url, 'unknown_action', **post_params)

        self.assert_json_error(result, "Unknown WordPress webhook action: WordPress Action")

    def get_body(self, fixture_name: str) -> str:
        return self.webhook_fixture_data("wordpress", fixture_name, file_type="txt")
