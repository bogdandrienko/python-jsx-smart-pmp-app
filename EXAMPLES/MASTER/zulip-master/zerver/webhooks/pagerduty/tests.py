from zerver.lib.test_classes import WebhookTestCase


class PagerDutyHookTests(WebhookTestCase):
    STREAM_NAME = 'pagerduty'
    URL_TEMPLATE = "/api/v1/external/pagerduty?api_key={api_key}&stream={stream}"
    FIXTURE_DIR_NAME = 'pagerduty'

    def test_trigger(self) -> None:
        expected_message = 'Incident [3](https://zulip-test.pagerduty.com/incidents/P140S4Y) triggered by [Test service](https://zulip-test.pagerduty.com/services/PIL5CUQ) (assigned to [armooo](https://zulip-test.pagerduty.com/users/POBCFRJ)):\n\n``` quote\nfoo\n```'
        self.check_webhook("trigger", "Incident 3", expected_message)

    def test_trigger_v2(self) -> None:
        expected_message = 'Incident [33](https://webdemo.pagerduty.com/incidents/PRORDTY) triggered by [Production XDB Cluster](https://webdemo.pagerduty.com/services/PN49J75) (assigned to [Laura Haley](https://webdemo.pagerduty.com/users/P553OPV)):\n\n``` quote\nMy new incident\n```'
        self.check_webhook("trigger_v2", "Incident 33", expected_message)

    def test_trigger_without_assignee_v2(self) -> None:
        expected_message = 'Incident [33](https://webdemo.pagerduty.com/incidents/PRORDTY) triggered by [Production XDB Cluster](https://webdemo.pagerduty.com/services/PN49J75) (assigned to nobody):\n\n``` quote\nMy new incident\n```'
        self.check_webhook("trigger_without_assignee_v2", "Incident 33", expected_message)

    def test_unacknowledge(self) -> None:
        expected_message = 'Incident [3](https://zulip-test.pagerduty.com/incidents/P140S4Y) unacknowledged by [Test service](https://zulip-test.pagerduty.com/services/PIL5CUQ) (assigned to [armooo](https://zulip-test.pagerduty.com/users/POBCFRJ)):\n\n``` quote\nfoo\n```'
        self.check_webhook("unacknowledge", "Incident 3", expected_message)

    def test_resolved(self) -> None:
        expected_message = 'Incident [1](https://zulip-test.pagerduty.com/incidents/PO1XIJ5) resolved by [armooo](https://zulip-test.pagerduty.com/users/POBCFRJ):\n\n``` quote\nIt is on fire\n```'
        self.check_webhook("resolved", "Incident 1", expected_message)

    def test_resolved_v2(self) -> None:
        expected_message = 'Incident [33](https://webdemo.pagerduty.com/incidents/PRORDTY) resolved by [Laura Haley](https://webdemo.pagerduty.com/users/P553OPV):\n\n``` quote\nMy new incident\n```'
        self.check_webhook("resolve_v2", "Incident 33", expected_message)

    def test_auto_resolved(self) -> None:
        expected_message = 'Incident [2](https://zulip-test.pagerduty.com/incidents/PX7K9J2) resolved:\n\n``` quote\nnew\n```'
        self.check_webhook("auto_resolved", "Incident 2", expected_message)

    def test_acknowledge(self) -> None:
        expected_message = 'Incident [1](https://zulip-test.pagerduty.com/incidents/PO1XIJ5) acknowledged by [armooo](https://zulip-test.pagerduty.com/users/POBCFRJ):\n\n``` quote\nIt is on fire\n```'
        self.check_webhook("acknowledge", "Incident 1", expected_message)

    def test_acknowledge_without_trigger_summary_data(self) -> None:
        expected_message = 'Incident [1](https://zulip-test.pagerduty.com/incidents/PO1XIJ5) acknowledged by [armooo](https://zulip-test.pagerduty.com/users/POBCFRJ):\n\n``` quote\n\n```'
        self.check_webhook(
            "acknowledge_without_trigger_summary_data", "Incident 1", expected_message
        )

    def test_acknowledge_v2(self) -> None:
        expected_message = 'Incident [33](https://webdemo.pagerduty.com/incidents/PRORDTY) acknowledged by [Laura Haley](https://webdemo.pagerduty.com/users/P553OPV):\n\n``` quote\nMy new incident\n```'
        self.check_webhook("acknowledge_v2", "Incident 33", expected_message)

    def test_incident_assigned_v2(self) -> None:
        expected_message = 'Incident [33](https://webdemo.pagerduty.com/incidents/PRORDTY) assigned to [Wiley Jacobson](https://webdemo.pagerduty.com/users/PFBSJ2Z):\n\n``` quote\nMy new incident\n```'
        self.check_webhook("assign_v2", "Incident 33", expected_message)

    def test_no_subject(self) -> None:
        expected_message = 'Incident [48219](https://dropbox.pagerduty.com/incidents/PJKGZF9) resolved:\n\n``` quote\nmp_error_block_down_critical\u2119\u01b4\n```'
        self.check_webhook("mp_fail", "Incident 48219", expected_message)
