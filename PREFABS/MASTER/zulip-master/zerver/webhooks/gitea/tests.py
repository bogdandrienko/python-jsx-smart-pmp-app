from unittest.mock import MagicMock, patch

from zerver.lib.test_classes import WebhookTestCase


class GiteaHookTests(WebhookTestCase):
    STREAM_NAME = 'commits'
    URL_TEMPLATE = "/api/v1/external/giteae?&api_key={api_key}&stream={stream}"
    FIXTURE_DIR_NAME = 'gitea'

    def test_multiple_commits(self) -> None:
        expected_topic = "test / d"
        expected_message = """kostekIV [pushed](https://try.gitea.io/kostekIV/test/compare/21138d2ca0ce18f8e037696fdbe1b3f0c211f630...2ec0c971d04723523aa20f2b378f8b419b47d4ec) 5 commits to branch d.

* commit ([2ec0c97](https://try.gitea.io/kostekIV/test/commit/2ec0c971d04723523aa20f2b378f8b419b47d4ec))
* commit ([6cb1701](https://try.gitea.io/kostekIV/test/commit/6cb1701c8b0114ad716f4cd49153076e7109cb85))
* commit ([6773eab](https://try.gitea.io/kostekIV/test/commit/6773eabc0778a3e38997c06a13f5f0c48b67e5dc))
* commit ([337402c](https://try.gitea.io/kostekIV/test/commit/337402cf675ce7082ddcd23d06a116c85241825a))
* commit ([0a38cad](https://try.gitea.io/kostekIV/test/commit/0a38cad3fac3a13bb78b738d13f15ce9cc3343fa))"""
        self.check_webhook("push__5_commits", expected_topic, expected_message)

    def test_new_branch(self) -> None:
        expected_topic = "test / test-branch"
        expected_message = "kostekIV created [test-branch](https://try.gitea.io/kostekIV/test/src/test-branch) branch."
        self.check_webhook("create__branch", expected_topic, expected_message)

    def test_pull_request_opened(self) -> None:
        expected_topic = "test / PR #1905 New pr"
        expected_message = """kostekIV opened [PR #4](https://try.gitea.io/kostekIV/test/pulls/4) from `test-branch` to `master`."""
        self.check_webhook("pull_request__opened", expected_topic, expected_message)

    def test_pull_request_merged(self) -> None:
        expected_topic = "test / PR #1905 New pr"
        expected_message = """kostekIV merged [PR #4](https://try.gitea.io/kostekIV/test/pulls/4) from `test-branch` to `master`."""
        self.check_webhook("pull_request__merged", expected_topic, expected_message)

    def test_pull_request_edited(self) -> None:
        expected_topic = "test / PR #1906 test 2"
        expected_message = """kostekIV edited [PR #5](https://try.gitea.io/kostekIV/test/pulls/5) from `d` to `master`."""
        self.check_webhook("pull_request__edited", expected_topic, expected_message)

    def test_pull_request_reopened(self) -> None:
        expected_topic = "test / PR #1906 test 2"
        expected_message = """kostekIV reopened [PR #5](https://try.gitea.io/kostekIV/test/pulls/5) from `d` to `master`."""
        self.check_webhook("pull_request__reopened", expected_topic, expected_message)

    def test_pull_request_closed(self) -> None:
        expected_topic = "test / PR #1906 test 2"
        expected_message = """kostekIV closed [PR #5](https://try.gitea.io/kostekIV/test/pulls/5) from `d` to `master`."""
        self.check_webhook("pull_request__closed", expected_topic, expected_message)

    def test_pull_request_assigned(self) -> None:
        expected_topic = "test / PR #1906 test 2"
        expected_message = """kostekIV assigned [PR #5](https://try.gitea.io/kostekIV/test/pulls/5) (assigned to kostekIV) from `d` to `master`."""
        self.check_webhook("pull_request__assigned", expected_topic, expected_message)

    def test_issues_opened(self) -> None:
        expected_topic = "test / Issue #3 Test issue"
        expected_message = """kostekIV opened [Issue #3](https://try.gitea.io/kostekIV/test/issues/3):\n\n~~~ quote\nTest body\n~~~"""
        self.check_webhook("issues__opened", expected_topic, expected_message)

    def test_issues_edited(self) -> None:
        expected_topic = "test / Issue #3 Test issue 2"
        expected_message = """kostekIV edited [Issue #3](https://try.gitea.io/kostekIV/test/issues/3) (assigned to kostekIV):\n\n~~~ quote\nTest body\n~~~"""
        self.check_webhook("issues__edited", expected_topic, expected_message)

    def test_issues_closed(self) -> None:
        expected_topic = "test / Issue #3 Test issue 2"
        expected_message = """kostekIV closed [Issue #3](https://try.gitea.io/kostekIV/test/issues/3) (assigned to kostekIV):\n\n~~~ quote\nTest body\n~~~"""
        self.check_webhook("issues__closed", expected_topic, expected_message)

    def test_issues_assigned(self) -> None:
        expected_topic = "test / Issue #3 Test issue"
        expected_message = """kostekIV assigned [Issue #3](https://try.gitea.io/kostekIV/test/issues/3) (assigned to kostekIV):\n\n~~~ quote\nTest body\n~~~"""
        self.check_webhook("issues__assigned", expected_topic, expected_message)

    def test_issues_reopened(self) -> None:
        expected_topic = "test / Issue #3 Test issue 2"
        expected_message = """kostekIV reopened [Issue #3](https://try.gitea.io/kostekIV/test/issues/3) (assigned to kostekIV):\n\n~~~ quote\nTest body\n~~~"""
        self.check_webhook("issues__reopened", expected_topic, expected_message)

    def test_issue_comment_new(self) -> None:
        expected_topic = "test / Issue #3 Test issue"
        expected_message = """kostekIV [commented](https://try.gitea.io/kostekIV/test/issues/3#issuecomment-24400) on [Issue #3](https://try.gitea.io/kostekIV/test/issues/3):\n\n~~~ quote\ntest comment\n~~~"""
        self.check_webhook("issue_comment__new", expected_topic, expected_message)

    def test_issue_comment_in_pr(self) -> None:
        expected_topic = "test / Issue #1 dummy"
        expected_message = """kostekIV [commented](https://try.gitea.io/kostekIV/test/pulls/1/files#issuecomment-24399) on [Issue #1](https://try.gitea.io/kostekIV/test/issues/1):\n\n~~~ quote\ntest comment\n~~~"""
        self.check_webhook("issue_comment__in_pr", expected_topic, expected_message)

    def test_issue_comment_edited(self) -> None:
        expected_topic = "test / Issue #3 Test issue 2"
        expected_message = """kostekIV edited a [comment](https://try.gitea.io/kostekIV/test/issues/3#issuecomment-24400) on [Issue #3](https://try.gitea.io/kostekIV/test/issues/3):\n\n~~~ quote\nedit test comment\n~~~"""

        self.check_webhook("issue_comment__edited", expected_topic, expected_message)

    @patch('zerver.webhooks.gogs.view.check_send_webhook_message')
    def test_push_filtered_by_branches_ignore(self, check_send_webhook_message_mock: MagicMock) -> None:
        self.url = self.build_webhook_url(branches='changes,development')
        payload = self.get_body('push__5_commits')
        result = self.client_post(self.url, payload, HTTP_X_GITEA_EVENT='push',
                                  content_type="application/json")
        self.assertFalse(check_send_webhook_message_mock.called)
        self.assert_json_success(result)
