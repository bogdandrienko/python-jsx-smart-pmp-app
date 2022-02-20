# Message retention policy (beta)

{!owner-only.md!}

By default, Zulip stores messages indefinitely, allowing full-text
search of your complete history.

Zulip supports configuring both a global organization-level message
retention policy, as well as retention policies for individual
streams.  These policies control how many days a message is stored
before being automatically deleted (the default being forever).
Zulip's system supports:

* Setting an organization-level retention policy, which applies to
  all private messages and all streams without a specific policy.
* Setting a retention policy for individual streams, which overrides
  the organization-level policy for that stream.  This can be used to
  just delete messages on specific streams, to only retain messages
  forever on specific streams, or just to have a different retention
  period.

In Zulip Cloud, message retention policies are available on the Zulip
Cloud Standard and Zulip Cloud Plus [plans](https://zulip.com/plans),
as well as for the hundreds of communities with sponsored Cloud
Standard hosting.

### Configure message retention policy for organization

{start_tabs}

{settings_tab|organization-settings}

4. Under **Message retention**, configure **Message retention period**.

{!save-changes.md!}

{end_tabs}

### Configure message retention policy for individual streams

{start_tabs}

{relative|stream|all}

1. Select a stream.

1. On the right, click **[Change]** next to the description of the stream
   permissions.

1. Under **Message retention for stream**, configure **Message retention period**.

{!save-changes.md!}

{end_tabs}

## Important details

* Retention policies are processed in a daily job; so changes in the
  policy won't have any effect until the next time the daily job runs.

* Deleted messages are preserved temporarily in a special archive.  So
if you discover a misconfiguration accidentally deleted content you
meant to preserve, contact Zulip support promptly for assistance with
restoration.  See the [deletion
documentation](/help/edit-or-delete-a-message#how-deletion-works) for
more details on precisely how message deletion works in Zulip.

## Related articles

* [Edit or delete a message](/help/edit-or-delete-a-message)
* [Delete a topic](/help/delete-a-topic)
* [Delete a stream](/help/delete-a-stream)
