# Version history

All notable changes to the Zulip server are documented in this file.

## Zulip 4.x series

### 4.0 -- Unreleased

This section lists notable unreleased changes; it is generally updated
in bursts.

#### Highlights

- Added copy-to-clipboard button on code blocks, making it convenient
  to extract code for external use.
- Significant work towards support for web-public streams (visible to
  the Internet without creating an account).
- Significant work towards stream-level administrator users.

#### Upgrade notes for 4.0

- Changed the Tornado service to use 127.0.0.1:9800 instead of
  127.0.0.1:9993 as its default network address, to simplify support
  for multiple Tornado processes.  Since Tornado only listens on
  localhost, this change should have no visible effect unless another
  service is using port 9800.

#### Full feature changelog

- Community topic editing time limit increased to 3 days for members.
- Removed HipChat import tool.
- Added support for moving topics to private streams.
- Added support for subscribing another stream's membership to a stream.
- Added RealmAuditLog for most settings state changes in Zulip; this
  data will fascilitate future features showing a log of activity by
  a given user or changes to an organization's settings.
- Added support for using Sentry for processing backend exceptions.
- Added documentation for using `wal-g` for continuous PostgreSQL backups.
- Added loading spinners for message editing widgets.
- Added live update of compose placeholder text when recipients change.
- The Zoom integration is now stable (no longer beta).
- Completed API documentation for Zulip's real-time events system.
- Fixed numerous rare exceptions when running Zulip at scale.
- Fixed various UI and accessibility issues in the registration and new
  user invitation flows.
- Fixed live update and UI bugs with streams being deactivated.
- Refactored typeahead and emoji components to be shareable with the
  mobile codebase.
- Replaced the old CasperJS frontend test suite with Puppeteer.
- Switched to `orjson` for JSON serialization, resulting in better
  performance and more standards-compliant validation.
- Various API endpoints creating objects now return the ID of the
  created object.
- Fixed screenreader accessibility of many components, including
  the compose box, message editing, popovers, and many more.
- Improved formatting of GitLab integration.
- Improved positioning logic for inline YouTube previews.
- Upgraded our ancient forked version of bootstrap, on a path towards
  removing the last forked dependencies from the codebase.
- Updated webapp codebase to use many modern ES6 patterns.
- Relabeled :smile: and :stuck_out_tongue: emoji to use better codepoints.

## Zulip 3.x series

### 3.2 -- September 15, 2020

- Switched from `libmemcached` to `python-binary-memcached`, a
  pure-Python implementation; this should eliminate memcached
  connection problems affecting some installations.
- Removed unnecessary `django-cookies-samesite` dependency, which had
  its latest release removed from PyPI (breaking installation of Zulip
  3.1).
- Limited which local email addresses Postfix accepts when the
  incoming email integration is enabled; this prevents the enumeration
  of local users via the email system.
- Fixed incorrectly case-sensitive email validation in `REMOTE_USER`
  authentication.
- Fixed search results for `has:image`.
- Fixed ability to adjust "Who can post on the stream" configuration.
- Fixed display of "Permission [to post] will be granted in n days"
  for n > 365.
- Support providing `nginx_listen_port` setting in conjunction with
  `http_only` in `zulip.conf`.
- Improved upgrade documentation.
- Removed internal ID lists which could leak into the events API.

### 3.1 -- July 30, 2020

- Removed unused `short_name` field from the User model.  This field
  had no purpose and could leak the local part of email addresses
  when email address visibility was restricted.
- Fixed a bug where loading spinners would sometimes not be displayed.
- Fixed incoming email gateway exception with unstructured headers.
- Fixed AlertWords not being included in data import/export.
- Fixed Twitter previews not including a clear link to the tweet.
- Fixed compose box incorrectly opening after uploading a file in a
  message edit widget.
- Fixed exception in SAML integration with encrypted assertions.
- Fixed an analytics migration bug that could cause upgrading from 2.x
  releases to fail.
- Added a Thinkst Canary integration (and renamed the old one, which
  was actually an integration for canarytokens.org).
- Reformatted the frontend codebase using prettier.  This change was
  included in this maintenance release to ensure backporting patches
  from master remains easy.

### 3.0 -- July 16, 2020

#### Highlights

- Added support for Ubuntu 20.04 Focal.  This release drops support
  for Ubuntu 16.04 Xenial and Debian 9 Stretch.
- Redesigned the top navbar/search area to be much cleaner and show
  useful data like subscriber counts and stream descriptions in
  default views.
- Added a new "recent topics" widget, which lets one browse recent
  and ongoing conversations at a glance.  We expect this widget to
  replace "All messages" as the default view in Zulip in the
  next major release.
- Redesigned "Notification settings" to have an intuitive table
  format and display any individual streams with non-default settings.
- Added support for moving topics between streams.  This was by far
  Zulip's most-requested feature.
- Added automatic theme detection using prefers-color-scheme.
- Added support for GitLab and Sign in with Apple authentication.
- Added an organization setting controlling who can use private messages.
- Added support for default stream groups, which allow organizations
  to offer options of sets of streams when new users sign up.
  Currently can only be managed via the Zulip API.
- The Zulip server now sets badge counts for the iOS mobile app.
- Quote-and-reply now generates a handy link to the quoted message.
- Upgraded Django from 1.11.x to the latest LTS series, 2.2.x.
- Added integrations for ErrBit, Grafana, Thinkst Canary, and Alertmanager.
- Extended API documentation to have detailed data on most responses,
  validated against the API's actual implementation and against all
  tests in our extensive automated test suite.
- Added support for programmable message retention policies, both a
  global/default policy and policies for specific streams.
- Added a new incoming webhook API that accepts messages in the format
  used by Slack's incoming webhooks API.
- Introduced the Zulip API feature level, a concept that will greatly
  simplify the implementation of mobile, terminal, and desktop clients
  that need to talk to a wide range of supported Zulip server
  versions, as well as the [Zulip API
  changelog](https://zulip.com/api/changelog).
- Our primary official domain is now zulip.com, not zulipchat.com.

#### Upgrade notes for 3.0

- Logged in users will be logged out during this one-time upgrade to
  transition them to more secure session cookies.
- This release contains dozens of database migrations, but we don't
  anticipate any of them being particularly expensive compared to
  those in past major releases.
- Previous versions had a rare bug that made it possible to create two
  user accounts with the same email address, preventing either from
  logging in.  A migration in this release adds a database constraint
  that will fix this bug.  The new migration will fail if any such
  duplicate accounts already exist; you can check whether this will
  happen be running the following in a [management shell][manage-shell]:
  ```
  from django.db.models.functions import Lower
  UserProfile.objects.all().annotate(email_lower=Lower("delivery_email"))
      .values('realm_id', 'email_lower').annotate(Count('id')).filter(id__count__gte=2)
  ```
  If the command returns any accounts, you need to address the
  duplicate accounts before upgrading.  Zulip Cloud only had two
  accounts affected by this bug, so we expect the vast majority of
  installations will have none.
- This release switches Zulip to install PostgreSQL 12 from the upstream
  PostgreSQL repository by default, rather than using the default
  PostgreSQL version included with the operating system.  Existing Zulip
  installations will continue to work with PostgreSQL 10; this detail is
  configured in `/etc/zulip/zulip.conf`.  We have no concrete plans to
  start requiring PostgreSQL 12, though we do expect it to improve
  performance.  Installations that would like to upgrade can follow
  [our new PostgreSQL upgrade guide][postgresql-upgrade].
- The format of the `JWT_AUTH_KEYS` setting has changed to include an
  [algorithms](https://pyjwt.readthedocs.io/en/latest/algorithms.html)
  list: `{"subdomain": "key"}` becomes `{"subdomain": {"key": "key",
  "algorithms": ["HS256"]}}`.
- Added a new organization owner permission above the previous
  organization administrator.  All existing organization
  administrators are automatically converted into organization owners.
  Certain sensitive administrative settings are now only
  editable by organization owners.
- The changelog now has a section that makes it easy to find the
  Upgrade notes for all releases one is upgrading across.

[manage-shell]: ../production/management-commands.html#manage-py-shell
[postgresql-upgrade]: ../production/upgrade-or-modify.html#upgrading-postgresql

#### Full feature changelog

- Added new options in "Manage streams" to sort by stream activity or
  number of subscribers.
- Added new options to control whether the incoming email integration
  prefers converting the plain text or HTML content of an email.
- Added server support for creating an account from mobile/terminal apps.
- The Zulip desktop apps now do social authentication (Google, GitHub,
  etc.) via an external browser.
- Added support for BigBlueButton as video chat provider.
- Added support for setting an organization-wide default language for
  code blocks.
- Added an API endpoint for fetching a single user.
- Added built-in rate limiting for password authentication attempts.
- Added data export/import support for organization logo and icon.
- Added documentation for several more API endpoints.
- Added new email address visibility option hiding real email
  addresses from organization administrators in the Zulip UI.
- Added new "Mention time" Markdown feature to communicate about times
  in a timezone-aware fashion.
- Added new "Spoiler" Markdown feature to hide text until interaction.
- Added a new API that allows the mobile/desktop/terminal apps to
  open uploaded files in an external browser that may not be logged in.
- Added several database indexes that significantly improve
  performance of common queries.
- Added an organization setting to disable the compose box video call feature.
- Added a user setting to disable sharing one's presence information
  with other users.
- Added support for IdP-initiated SSO in the SAML authentication backend.
- Added new "messages sent over time" graph on /stats.
- Added support for restricting SAML authentication to only some Zulip
  organizations.
- Added `List-Id` header to outgoing emails for simpler client filtering.
- Changed how avatar URLs are sent to clients to dramatically improve
  network performance in organizations with 10,000s of user accounts.
- Redesigned all of our avatar/image upload widgets to have a cleaner,
  simpler interface.
- Normal users can now see invitations they sent via organization settings.
- Rewrote the Zoom video call integration.
- Polished numerous subtle elements of Zulip's visual design.
- Dramatically improved the scalability of Zulip's server-to-client
  push system, improving throughput by a factor of ~4.
- Improved handling of GitHub accounts with several email addresses.
- Improved "Manage streams" UI to clearly identify personal settings
  and use pills for adding new subscribers.
- Improved Sentry, Taiga, GitHub, GitLab, Semaphore, and many other integrations.
- Improved "Muted topics" UI to show when a topic was muted.
- Improved the UI for "Drafts" and "Message edit history" widgets.
- Improved left sidebar popovers to clearly identify administrative actions.
- Rewrote substantial parts of the Zulip installer to be more robust.
- Replaced the chevron menu indicators in sidebars with vertical ellipses.
- Removed the right sidebar "Group PMs" widget.  It's functionality is
  available in the left sidebar "Private messages" widget.
- Removed the Google Hangouts integration, due to Google's support for
  it being discontinued.
- Removed a limitation on editing topics of messages more than a week old.
- The Gitter data import tool now supports importing multiple Gitter
  rooms into a single Zulip organization.
- Missed-message emails and various onboarding content are now tagged
  for translation.
- Redesigned the notice about large numbers of unread messages to be
  a banner (no longer a modal) and to use a better trigger.
- Cleaned up dozens of irregularities in how the Zulip API formats
  data when returning it to clients.
- Extended stream-level settings for who can post to a stream.
- Extended GET /messages API to support a more intuitive way to
  request the first unread or latest message as the anchor.
- Muted topics will now only appear behind "more topics".
- Improved UI for picking which streams to invite new users to.
- Improved UI for reviewing one's muted topics.
- Improved UI for message edit history.
- Fixed many minor issues with Zulip's Markdown processors.
- Fixed many subtle issues with the message editing UI.
- Fixed several subtle issues with the default nginx configuration.
- Fixed minor issues with various keyboard shortcuts.
- Fixed UI bugs with Zulip's image lightbox.
- Specifying `latex` or `text` as the language for a code block now
  does LaTeX syntax highlighting (`math` remains the recommended code
  block language to render LaTeX syntax into display math).
- Fixed performance problems when adding subscribers in organizations
  with thousands of streams.
- Fixed performance issues with typeahead and presence in
  organizations with 10,000s of total users.
- Fixed guest users being added to the notifications stream
  unconditionally.
- Fixed inconsistencies in the APIs for fetching users and streams.
- Fixed several subtle bugs with local echo in rare race conditions.
- Fixed a subtle race that could result in semi-duplicate emoji reactions.
- Fixed subtle click-handler bugs with the mobile web UI.
- Improved defaults to avoid OOM kills on low RAM servers when running
  expensive tools like `webpack` or Slack import.
- Added loading indicators for scrolling downwards and fixed several
  subtle bugs with the message feed discovered as a result.
- Added a migration to fix invalid analytics data resulting from a
  missing unique constraint (and then add the constraint).
- Dramatically simplified the process for adding a new authentication backend.
- Added webhook support for AnsibleTower 9.x.y.
- Essentially rewrote our API documentation using the OpenAPI format,
  with extensive validation to ensure its accuracy as we modify the API.
- Removed New User Bot and Feedback Bot.  Messages they had sent are
  migrated to have been sent by Notification Bot.
- Removed the "pointer" message ID from Zulip, a legacy concept dating
  to 2012 that predated tracking unread messages in Zulip and has
  largely resulted in unexpected behavior for the last few years.
- Reduced visual size of emoji in message bodies for a cleaner look.
- Replaced file upload frontend with one supporting chunked upload.
  We expect this to enable uploading much larger files using Zulip in
  future releases.
- Improved error messages when trying to invite a user with an
  existing, deactivated, account.
- Improved server logging format to refer to users with
  `userid@subdomain` rather than referencing email addresses.
- Improved warnings when sending wildcard mentions to large streams.
- Migrated the frontend codebase to use native ES6 data structures.
- Migrated settings for notifications streams to our standard UX model.
- Various security hardening changes suggested by the PySA static analyzer.
- Modernized the codebase to use many Python 3.6 and ES6 patterns.
- Integrated isort, a tool which ensures that our Python codebase
  has clean, sorted import statements.
- Integrated PySA, a tool for detecting security bugs in Python
  codebases using the type-checker.
- Integrated semgrep, and migrated several regular expression based
  linter rules to use its Python syntax-aware parser.
- Added tooling to automatically generate all screenshots in
  integration docs.
- Restructured the backend for Zulip's system administrator level
  settings system to be more maintainable.
- This release largely completes the SCSS refactoring of the codebase.
- Replaced our CasperJS frontend integration test system with Puppeteer.
- Extracted the typeahead and Markdown libraries for reuse in the
  mobile apps.
- Removed the legacy websockets-based system for sending messages.  This
  system was always a hack, was only ever used for one endpoint, and
  did not provide a measureable latency benefit over HTTP/2.

## Zulip 2.1.x series

### 2.1.7 -- 2020-06-25

- CVE-2020-15070: Fix privilege escalation vulnerability with custom
  profile fields and direct write access to Zulip's PostgreSQL database.
- Changed default memcached authentication username to zulip@localhost,
  fixing authentication problems when servers change their hostname.

### 2.1.6 -- 2020-06-17

- Fixed use of Python 3.6+ syntax in 2.1.5 release that prevented
  installation on Ubuntu Xenial.

### 2.1.5 -- 2020-06-16

- CVE-2020-12759: Fix reflected XSS vulnerability in Dropbox webhook.
- CVE-2020-14194: Prevent reverse tabnapping via topic header links.
- CVE-2020-14215: Fixed use of invitation role data from expired
  invitations on signup via external authentication methods.
- CVE-2020-14215: Fixed buggy `0198_preregistrationuser_invited_as`
  database migration from the 2.0.0-rc1 release, which incorrectly added
  the administrator role to invitations.
- CVE-2020-14215: Added migration to clear the administrator role from
  any invitation objects already corrupted by the buggy version of the
  `0198_preregistrationuser_invited_as` migration.
- Fixed missing quoting of certain attributes in HTML templates.
- Allow /etc/zulip to be a symlink (for docker-zulip).
- Disabled access from insecure Zulip Desktop releases below version 5.2.0.
- Adjusted Slack import documentation to help administrators avoid OOM
  kills when doing Slack import on low-RAM systems.
- Fixed a race condition fetching users' personal API keys.
- Fixed a few bugs with Slack data import.

#### Upgrade notes for 2.1.5

Administrators of servers originally installed with Zulip 1.9 or older
should audit for unexpected [organization
administrators][audit-org-admin] following this upgrade, as it is
possible CVE-2020-14215 caused a user to incorrectly join as an
organization administrator in the past.  See the release blog post for
details.

[audit-org-admin]: https://zulip.com/help/change-a-users-role

### 2.1.4 -- 2020-04-16

- Fixed a regression in 2.1.3 that impacted creating the very first
  organization via our data import tools.
- Remove the old `tsearch_extras` PostgreSQL extension, which was causing
  an exception restoring backups on fresh Zulip servers that had been
  generated on systems that had been upgraded from older Zulip releases.
- Removed fetching GitHub contributor data from static asset build
  process.  This makes `upgrade-zulip-from-git` much more reliable.
- Updated translation data from Transifex.
- Support for Ubuntu 16.04 Xenial and Debian 9 Stretch is now deprecated.

### 2.1.3 -- 2020-04-01

- CVE-2020-9444: Prevent reverse tabnapping attacks.
- CVE-2020-9445: Remove unused and insecure modal_link feature.
- CVE-2020-10935: Fix XSS vulnerability in local link rewriting.
- Blocked access from Zulip Desktop versions below 5.0.0.  This
  behavior can be adjusted by editing `DESKTOP_*_VERSION`
  in `/home/zulip/deployments/current/version.py`.
- Restructured server initialization to simplify initialization of
  Docker containers (eliminating common classes of user error).
- Removed buggy feedback bot (`ENABLE_FEEDBACK`).
- Migrated GitHub authentication to use the current encoding.
- Fixed support for restoring a backup on a different minor release
  (in the common case they have the same database schema).
- Fixed restoring backups with memcached authentication enabled.
- Fixed preview content (preheaders) for many emails.
- Fixed buggy text in missed-message emails with PM content disabled.
- Fixed buggy loading spinner in "emoji format" widget.
- Fixed sorting and filtering users in organization settings.
- Fixed handling of links to deleted streams.
- Fixed check-rabbitmq-consumers monitoring.
- Fixed copy-to-clipboard button for outgoing webhook bots.
- Fixed logging spam from soft_deactivation cron job.
- Fixed email integration handling of emails with nested MIME structure.
- Fixed Unicode bugs in incoming email integration.
- Fixed error handling for Slack data import.
- Fixed incoming webhook support for AWX 9.x.y.
- Fixed a couple missing translation tags.
- Fixed "User groups" settings UI bug for administrators.
- Fixed data import tool to reset resource limits after importing
  data from a free plan organization on zulip.com.
- Changed the SAML default signature algorithm to SHA-256, overriding
  the SHA-1 default used by python3-saml.

### 2.1.2 -- 2020-01-16

- Corrected fix for CVE-2019-19775 (the original fix was affected by
  an unfixed security bug in Python's urllib, CVE-2015-2104).
- Migrated data for handling replies to missed-message emails from
  semi-persistent Redis to the fully persistent database.
- Added authentication for Redis and memcached even in configurations
  where these are running on localhost, for add hardening against
  attacks from malicious processes running on the Zulip server.
- Improved logging for misconfigurations of LDAP authentication.
- Improved error handling for invalid LDAP configurations.
- Improved error tracebacks for invalid memcached keys.
- Fixed support for using LDAP with email address visibility
  limited to administrators.
- Fixed styling of complex markup within /me messages.
- Fixed left sidebar duplicating some group private message threads.
- Fixed the "Mentions" narrow being unable to mark messages as read.
- Fixed error handling bug preventing rerunning the installer.
- Fixed a few minor issues with migrations for upgrading from 2.0.x.

### 2.1.1 -- 2019-12-13

- Fixed upgrading to 2.1.x with the LDAP integration enabled in a
  configuration where `AUTH_LDAP_REVERSE_EMAIL_SEARCH` is newly
  required, but is not yet set.
- Reimplemented `--postgres-missing-dictionaries` installer option,
  used with our new support for a DBaaS managed database.
- Improved documentation for `AUTH_LDAP_REVERSE_EMAIL_SEARCH`.

### 2.1.0 -- 2019-12-12

#### Highlights

- Added support for Debian buster.  Removed support for EOL Ubuntu Trusty.
- Added support for SAML authentication.
- Removed our dependency on `tsearch_extras`, making it possible to
  run a production Zulip server against any PostgreSQL database
  (including those where one cannot install extensions, like Amazon RDS).
- Significantly improved the email->Zulip gateway, and added [nice
  setup documentation](../production/email-gateway.md).  It now
  should be possible to subscribe a Zulip stream to an email list and
  have a good experience.
- Added an option for hiding access to user email addresses from
  other users.  While counterproductive for most corporate
  communities, for open source projects and other volunteer
  organizations, this can be a critical anti-spam feature.
- Added a new setting controlling which unread messages are counted in
  the favicon, title, and desktop app.
- Support for showing inline previews of linked webpages has moved
  from alpha to beta.  See the upgrade notes below for some changes in
  how it is configured.
- Added support for importing an organization from Mattermost (similar
  to existing Slack/HipChat/Gitter import tools).  Slack import now
  supports importing data only included in corporate exports,
  including private messages and shared channels.
- Added Markdown support and typeahead for mentioning topics.
- Email notifications have been completely redesigned with a minimal,
  readable style inspired by GitHub's email notifications.
- We merged significant preparatory work for supporting RHEL/CentOS in
  production.  We're now interested in beta testers for this feature.
- Reorganized Zulip's documentation for sysadmins, and added [new
  documentation](../production/upgrade-or-modify.html#modifying-zulip)
  on maintaining a fork of Zulip.
- Added new `streams:public` search operator that searches the public
  history of all streams in the organization (even before you joined).
- Added support for sending email and mobile push notifications for
  wildcard mentions (@all and @everyone).  Previously, they only
  triggered desktop notifications; now, that's configurable.

#### Upgrade notes for 2.1.0

- The defaults for Zulip's now beta inline URL preview setting have changed.
Previously, the server-level `INLINE_URL_EMBED_PREVIEW` setting was
disabled, and organization-level setting was enabled.  Now, the
server-level setting is enabled by default, and the organization-level
setting is disabled.  As a result, organization administrators can
configure this feature entirely in the UI.  However, servers that had
previously [enabled previews of linked
websites](https://zulip.com/help/allow-image-link-previews) will
lose the setting and need to re-enable it.
- We rewrote the Google authentication backend to use the
  `python-social-auth` system we use for other third-party
  authentication systems.  For this release, the old variable names
  still work, but users should update the following setting names in
  their configuration as we will desupport the old names in a future
  release:
    * In `/etc/zulip/zulip-secrets.conf`, `google_oauth2_client_secret`
      is now called with `social_auth_google_secret`.
    * In `/etc/zulip/settings.py`, `GOOGLE_OAUTH2_CLIENT_ID` should be
      replaced with `SOCIAL_AUTH_GOOGLE_KEY`.
    * In `/etc/zulip/settings.py`, `GoogleMobileOauth2Backend` should
      be replaced with called `GoogleAuthBackend`.
- Installations using Zulip's LDAP integration without
  `LDAP_APPEND_DOMAIN` will need to configure two new settings telling
  Zulip how to look up a user in LDAP given their email address:
  `AUTH_LDAP_REVERSE_EMAIL_SEARCH` and `AUTH_LDAP_USERNAME_ATTR`. See
  the [LDAP configuration
  instructions](../production/authentication-methods.html#ldap-including-active-directory)
  for details.  You can use the usual `manage.py query_ldap` method to
  verify whether your configuration is working correctly.
- The Zulip web and desktop apps have been converted to directly count
  all unread messages, replacing an old system that just counted the
  (recent) messages fully fetched by the webapp.  This one-time
  transition may cause some users to notice old messages that were
  sent months or years ago "just became unread".  What actually
  happened is the user never read these messages, and the Zulip webapp
  was not displaying that.  Generally, the fix is for users to simply
  mark those messages as read as usual.
- Previous versions of Zulip's installer would generate the secrets
  `local_database_password` and `initial_password_salt`.  These
  secrets don't do anything, as they only modify behavior of a Zulip
  development environment.  We recommend deleting those lines from
  `/etc/zulip/zulip-secrets.conf` when you upgrade to avoid confusion.
- This release has a particularly expensive database migration,
  changing the `UserMessage.id` field from an `int` to a `bigint` to
  support more than 2 billion message deliveries on a Zulip server.
  It runs in 2 phases: A first migration that doesn't require the
  server to be down (which took about 4 hours to process the 250M rows
  on chat.zulip.org, and a second migration that does require downtime
  (which took about 60 seconds for chat.zulip.org). You can check the
  number of rows for your server with `UserMessage.objects.count()`.

  We expect that most Zulip servers can happily just use the normal
  upgrade process with a few minutes of downtime.  Zulip servers with
  over 1M messages may want to first upgrade to [this
  commit](https://github.com/zulip/zulip/commit/b008515d63841e1c0a16ad868d3d67be3bfc20ca)
  using `upgrade-zulip-from-git`, following the instructions to avoid
  downtime, and then upgrade to the new release.

#### Full feature changelog
- Added sortable columns to all tables in settings pages.
- Added webapp support for self-service public data exports.
- Added 'e' keyboard shortcut for editing currently selected message.
- Added support for unstarring all starred messages.
- Added support for using `|` as an OR operator in sidebar search features.
- Added direct download links for Android APKs to our /apps page.
- Added a responsive design for our /integrations/ pages.
- Added typeahead for slash commands.
- Added more expansive moderation settings for who can create streams,
  edit user groups, or invite other users to join streams.
- Added new Bitbucket Server, Buildbot, Harbor, Gitea and Redmine integrations.
- Added proper open graph tags for linking to a Zulip organization.
- Added organization setting to disable users uploading new avatars
  (for use with LDAP synchronization).
- Added support for completely disabling the file upload feature.
- Added a new "external account" custom profile field type, making it
  convenient to link to profiles on GitHub, Twitter, and other tools.
- Added support for choosing which email address to use in GitHub auth.
- Added a new setting to control whether inactive streams are demoted.
- Added webapp support for new desktop app features: inline reply
  from notifications, and detecting user presence from OS APIs.
- Added Markdown support for headings, implemented using `# heading`,
  and removed several other unnecessary differences from CommonMark.
- Added local echo when editing messages for a more responsive experience.
- Changes to global notification settings for stream messages now
  affect existing subscriptions where the user had not explicitly
  changed the notification settings, as expected.
- The default setting value is now to send mobile push notifications
  if the user was recently online.
- Fixed issues with positioning and marking messages as read when
  doing a search where some results are unread messages.
- The private messages widget shows much deeper history of private
  message conversations in a scrollable widget (1K PMs of history).
- When there are dozens of unread topics, topic lists in the left
  sidebar now show at most 8 topics, with the rest behind "more topics".
- New users now see their most recent 20 messages as unread, to
  provide a better onboarding experience.
- Redesigned the in-app "keyboard shortcuts" popover to be more usable.
- Redesigned the interactions on several settings pages.
- Significantly improved the visual spacing around bulleted lists,
  blockquotes, and code blocks in Zulip's message feed.
- Extended buttons to visit links in topics to all URLs, not just
  URLs added by a linkifier.
- Extended several integrations to cover more events and fix bugs, and
  rewrote formatting for dozens of integraitons for cleaner punctuation.
- The beta "weekly digest emails" feature is again available as an
  organization-level configuration option, after several improvements.
- The administrative UI for managing bots now nicely links to the
  bot's owner.
- Restructured "private messages" widget to have a cleaner design.
- Significantly improved performance of the backend Markdown processor.
- Significantly improved Help Center documentation of dozens of features.
- Simplified and internationalized some notification bot messages.
- The compose box placeholder now shows users active status.
- Clicking the "EDITED" text on a message now pops message edit history.
- Adjusted the default streams in new realms to be easier to
  understand for new users.
- Improved default nginx TLS settings for stronger security.
- Improved UI of administrative user management UI.
- Improved error messages for various classes of invalid searches.
- Improved styling of both Markdown unordered and numbered lists.
- Compose typeahead now autofills stream field if only subscribed to
  one stream.
- Bot users can now post to announcement-only streams if their owners
  can (this preserves the pre-existing security model).
- User full names now must use characters valid in an email from line.
- Settings pages that normal users cannot modify are now hidden by default.
- The `has:link`, `has:attachment`, and `has:image` search keywords
  have been redesigned to correctly handle corner cases like links in
  code blocks.
- Replaced title attributes with nice tooltips in the message feed and
  buddy list.
- Fixed incorrect caching settings for the Zulip API, which could result
  in browsers appearing to display old content or remark messages unread.
- Fixed a bug that prevented sending mobile push notifications when the
  user was recently online via the mobile app.
- Fixed buggy handling of LaTeX in quote-and-reply.
- Fixed buggy rendering of bulleted lists inside blockquotes.
- Fixed several bugs with CORS in the nginx configuration.
- Fixed error message for GitHub login attempts with a deactivated account.
- Fixed email gateway issues with non-latin characters in stream names.
- Fixed endless re-synchronization of LDAP user avatars (which
  could cause user-visible performance issues for desktop/web clients).
- Fixed all known bugs with advanced LDAP data synchronization.
- Fixed numbered list handling of blank lines between blocks.
- Fixed performance issues that made users soft-deactivated for over a
  year unable to return to the app.
- Fixed missing -X GET/POST parameters in API docs curl examples.  The
  API documentation for curl examples is now automatically generated
  with automated tests for the examples to prevent future similar bugs.
- Fixed multi-line /me messages only working for the sender.
- Fixed password strength meter not updating on paste.
- Fixed numerous errors and omissions in the API documentation.  Added
  a test suite comparing the API documentation to the implementation.
- Fixed copy/paste of blocks of messages in Firefox.
- Fixed problems with exception reporting when memcached is down.
- Fixed pinned streams being incorrectly displayed as inactive.
- Fixed password reset page CSS for desktop app.
- Fixed "more topics" appearing for new streams, where we can be
  confident we already have all the topics cached in the browser.
- Fixed some subtle bugs with event queues and message editing.
- Fixed real-time sync for reactions and message edits on a message
  sent to a private stream with shared history before the current user
  joined that stream.
- Fixed several subtle real-time sync issues with "stream settings".
- Fixed a few subtle Markdown processor bugs involving emoji.
- Fixed several issues where linkifiers validation was overly restrictive.
- Fixed several rare/minor UI consistency issues in the left sidebar.
- Fixed issues involving saving a message edit before file upload completes.
- Fixed issues with pasting images into the compose box from Safari.
- Fixed email gateway bot being created with incorrectly cached permissions.
- Fixed guest users seeing UI widgets they can't use.
- Fixed several issues with click handlers incorrectly closing compose.
- Fixed buggy behavior of /me messages not ending with a paragraph.
- Fixed several major UI issues with the mobile webapp.
- Fixed HTML styling when copy-pasting content out of Zulip's night theme.
- Fixed obscure traceback with Virtualenv 16.0.0 unexpectedly installed.
- Added a new visual tool for testing webhook integrations.
- Rewrote the Google authentication backend to use python-social-auth,
  removing Zulip's original 2013-era SSO authentication backend.
- The `/server_settings` API now advertises supported authentication
  methods alongside details on how to render login/registration buttons.
- Rewrote HTML/CSS markup for various core components to be more
  easily modified.
- Removed the legacy static asset pipeline; everything now uses webpack.
- Renamed the system bot Zulip realm to "zulipinternal" (was "zulip").
- Switched our scrollbars to use simplebar, fixing many subtle
  scrollbar-related bugs in the process.
- Enabled webpack code splitting and deduplication.
- Started migrating our frontend codebase to TypeScript.

## Zulip 2.0.x series

### 2.0.8 -- 2019-12-12

- CVE-2019-19775: Close open redirect in thumbnail view.

### 2.0.7 -- 2019-11-21

- CVE-2019-18933: Fix insecure account creation via social authentication.
- Added backend enforcement of zxcvbn password strength checks.

### 2.0.6 -- 2019-09-23

- Updated signing keys for the PGroonga repository for Debian Stretch.
- Fixed creation of linkifiers with URLs containing &.
- Fixed a subtle bug that could cause the message list to suddenly
  scroll up in certain rare race conditions.

### 2.0.5 -- 2019-09-11

- CVE-2019-16215: Fix DoS vulnerability in Markdown LINK_RE.
- CVE-2019-16216: Fix MIME type validation.
- Fixed email gateway postfix configuration for Ubuntu Bionic.
- Fixed support for hidden_by_limit messages in Slack import.
- Fixed confusing output from the `knight` management command.

### 2.0.4 -- 2019-06-29

- Fixed several configuration-dependent bugs that caused
  restore-backup to crash.
- Fixed a table layout bug in "deactivated users" settings.
- Fixed an exception when administrators edited bot users when custom
  profile fields were configured in the organization.
- Fixed a bug enabling the PGRoonga search backend with older PostgreSQL.
- Fixed getting personal API key when passwords are disabled.

### 2.0.3 -- 2019-04-23

- Added documentation for upgrading the underlying OS version.
- Made uwsgi buffer size configurable (relevant for sites putting
  Zulip behind a proxy that adds many HTTP headers).
- Fixed loss of LaTeX syntax inside quote-and-reply.
- Fixed virtualenv-related bug when upgrading Zulip when the system
  virtualenv package is 16.0.0 or newer (no supported platform has
  such a version by default, but one can install it manually).
- Fixed `manage.py query_ldap` test tool (broken in 2.0.2).
- Fixed several bugs in new backup and restore tools.
- Fixed minor bugs with YouTube previews.

### 2.0.2 -- 2019-03-15

- Fixed a regression in the Puppet configuration for S3 upload backend
  introduced in 2.0.1.
- Fixed a too-fast fade for "Saved" in organization settings.
- Fixed a white flash when loading a browser in night mode.
- Fixed a few bugs in new LDAP synchronization features.
- Fixed a buggy validator for custom stream colors.
- Fixed a confusing "Subscribe" button appearing for guest users.
- Updated translations, including a new Italian translation.

### 2.0.1 -- 2019-03-04

- Fixed handling of uploaded file routing on Ubuntu Trusty.
- Fixed buggy behavior of branding logos in night theme.
- Fixed handling of deployment directories being owned by root.
- The styling of "unavailable" status icons is now less prominent.
- The "deactivated realm" error page now auto-refreshes, to handle
  realm reactivation.
- Updated documentation to avoid recommending realm deactivation as
  a preferred approach to prepare for backups.
- Added support for using multiple organizations with same LDAP
  backend configuration.

### 2.0.0 -- 2019-03-01

#### Highlights
- Added automation for synchronizing user avatars, custom profile
  fields, disabled status, and more from LDAP/active directory.
- Added support for explicitly setting oneself as "away" and "user
  status" messages.
- Added a built-in /poll slash command for lightweight polls.
- Added experimental support for using Zoom as the video chat
  provider.  We now support Jitsi, Google Hangouts, and Zoom.
- Added support for branding the top-left corner of the logged in app
  with an organization's logo.
- Zulip's "Guest users" feature is no longer experimental.
- The HipChat/Stride data import tool is no longer experimental.
  Our HipChat and Slack import tools are now well-tested with millions
  of messages, 10,000s of users, and 100,000s of uploaded files.
- Added a built-in tool for backups and restoration.
- Deprecated support for Ubuntu Trusty.  Zulip 2.0.x will continue to
  support Ubuntu Trusty, but Zulip 2.1.0 will remove support for
  installing on Trusty.

#### Upgrade notes for 2.0.0

- This release adds support for submitting basic usage statistics to
help the Zulip core team. This feature can be enabled only if a server
is using the [Mobile Push Notification Service][mpns-statistics-docs],
and is enabled by default in that case. To disable it, set
`SUBMIT_USAGE_STATISTICS = False` in `/etc/zulip/settings.py`.

[mpns-statistics-docs]: ../production/mobile-push-notifications.html#submitting-statistics

#### Full feature changelog
- Added support for CentOS 7 in the development environment
  provisioning process.  This is an important step towards production
  CentOS/RHEL 7 support.
- Added a new invitation workflow with reusable links.
- Added a new Azure Active Directory authentication integration.
  New authentication backends supported by python-social-auth can now be
  added with just a few dozen lines of code.
- Added API documentation for user groups and custom emoji.
- Administrators can now easily delete all messages in a topic.
- Added display of a user's role (administrator, guest, etc.) in
  various relevant places.
- Added support for sending "topic" rather than the legacy "subject"
  for the topic in most API endpoints.
- Added helpful notifications for some common webhook
  misconfigurations.
- Added organization setting to control whether users are allowed to
  include message content in missed-message emails (for compliance).
- Added an automated notification when streams are renamed.
- Added support for changing the default notification sound.
- Added Ctrl+. shortcut for narrowing to current compose recipient.
- Added icons to indicate which "organization settings" tabs are
  available to regular users.
- Added a tool for migrating from S3 to the local file uploads backend.
- Added protocol for communicating version incompatibility to mobile apps.
- Added support for copying avatar and other profile data when
  creating a second account on a Zulip server with a given email address.
- Added /digest endpoint for viewing the current digest email on the web.
- Added alert for when a user sends a message when scrolled too far up.
- Added internationalization for outgoing emails.
- Added a ReviewBoard integration, and improved numerous existing integrations.
- Added support for multi-line messages for the /me feature.
- Added Markdown rendering of text when displaying custom profile fields.
- Added "silent mentions" syntax (`@_**Tim Abbott**`), which show
  visually, but don't trigger a notification to the target user.
- Added support for using lightbox in compose preview.
- Changes in date no longer force a repeated recipient bar.  This
  fixes a common source of confusion for new users.
- Suppressed notifications when quoting a message mentioning yourself.
- Message editing now has the compose widgets for emoji, video calls, etc.
- Message editing now has a Markdown preview feature just like compose.
- Message editing now uses same "Enter-sends" behavior as compose.
- Organization administrators can now edit users' custom profile fields.
- Optimized performance of data import from Slack, HipChat, etc.
- Improved "new user" emails to clearly indicator login details.
- Improved the UI for "drafts" and "message edit history".
- Improved linkifier handling of languages with character alphabets.
- Improved accessibility of emoji rendering in messages bodies.
- Eliminated UI lag when using "Quote and reply".
- Expanded production documentation for more unusual deployment options.
- Expanded set of characters allowed in custom linkifiers.
- Optimized development provisioning; now takes 2s in the no-op case.
- Zulip's Help Center now has nicely generated open graph tags.
- Fixed missing API authentication headers for mobile file access.
- Fixed various select and copy-paste issues.
- Fixed various back button bugs in settings UI.
- Fixed various mobile web visual issues.
- Fixed unnecessary resizing of animated custom emoji.
- Fixed several performance issues for organizations with 1000s of streams.
- Fixed various error handling bugs sending push notifications.
- Fixed handling of diacritics in user-mention typeahead.
- Fixed several bugs with importing data into Zulip's S3 backend.
- Fixed display of full recipients list in "private messages" hover.
- Fixed bugs involving muting and renamed streams.
- Fixed soft-deactivation performance issues with many thousands of users.
- Countless behind-the-scenes improvements to Zulip's codebase,
  tooling, automated tests, error handling, and APIs.

## Zulip 1.9.x series

### 1.9.2 -- 2019-01-29

This release migrates Zulip off a deprecated Google+ API (necessary
for Google authentication to continue working past March 7), and
contains a few bug fixes for the installer and Slack import.  It has
minimal changes for existing servers not using Google authentication.

- Updated the Google auth integration to stop using a deprecated and
  soon-to-be-removed Google+ authentication API.
- Improved installer error messages for common configuration problems.
- Fixed several bugs in Slack, Gitter, and HipChat import tools.
- Fixed a subtle bug in garbage-collection of the node_modules cache.
- Optimized performance of Slack import for organizations with
  thousands of users.

### 1.9.1 -- 2018-11-30

This release is primarily intended to improve the experience for new
Zulip installations; it has minimal changes for existing servers.

- Added support for getting multi-domain certificates with setup-certbot.
- Improved various installer error messages and sections of the
  installation documentation to help avoid for common mistakes.
- The Google auth integration now always offers an account chooser.
- Fixed buggy handling of avatars in Slack import.
- Fixed nginx configuration for mobile API authentication to access uploads.
- Updated translation data, including significant new Italian strings.

### 1.9.0 -- 2018-11-07

#### Highlights

- Support for Ubuntu bionic and Debian stretch (our first non-Ubuntu
  platform!).  We expect to deprecate support for installing a new
  Zulip server on Ubuntu Trusty in the coming months, in preparation
  for Trusty’s end-of-life in April 2019.
- New data import tools for HipChat and Gitter.  The Slack importer
  is now out of beta.
- Zulip Python process startup time is about 30% faster; this effort
  resulted in upstream contributions to fix significant performance
  bugs in django-bitfield, libthumbor, and pika.
- You can now configure custom (organization-specific) fields for user
  profiles; Zulip can now serve as your organization’s employee
  directory.
- Zulip now supports using Google Hangouts instead of Jitsi as the
  video chat provider.
- Users can now configure email and mobile push notifications for
  all messages in a stream (useful for low-traffic
  streams/organizations), not just for messages mentioning them.
- New [stream settings](https://zulip.com/help/stream-permissions)
  control whether private stream subscribers can access history
  from before they joined, and allow configuring streams to only
  allow administrators to post.
- Zulip now has experimental support for guest users (intended
  for use cases like contractors who the organization only wants
  to have access to a few streams).
- New native integrations for Ansible Tower, Appveyor, Clubhouse,
  Netlify, and Zabbix; Zulip now has over 100 native integrations (in
  addition to hundreds more available via Zapier and IFTTT).
- New translations for Ukrainian, Portuguese, Indonesian, Dutch, and
  Finnish.  Zulip now has complete or nearly-complete translations
  for German, Spanish, French, Portuguese, Russian, Ukrainian,
  Czech, Finnish, and Turkish.  Partial translations for Chinese,
  Dutch, Korean, Polish, Japanese, and Indonesian cover the majority
  of the total strings in the project.

#### Upgrade notes for 1.9.0

* Zulip 1.9 contains a significant database migration that can take
  several minutes to run.  The upgrade process automatically minimizes
  disruption by running this migration first, before beginning the
  user-facing downtime.  However, if you'd like to watch the downtime
  phase of the upgrade closely, we recommend
  [running them first manually](../production/expensive-migrations.md)
  and as well as the usual trick of
  doing an apt upgrade first.

#### Full feature changelog
- Added an organization setting for message deletion time limits.
- Added an organization setting to control who can edit topics.
- Added Ctrl+K keyboard shortcut for getting to search (same as /, but
  works even when you're inside compose).
- Renamed the hotkey for starring a message to Ctrl+S.
- Added the new `SOCIAL_AUTH_SUBDOMAIN` setting, which all servers using
  both GitHub authentication and hosting multiple Zulip organizations
  should set (see [the docs for details](../production/multiple-organizations.html#authentication)).
- Added automatic thumbnailing of images, powered by thumbor.  The new
  THUMBOR_URL setting controls this feature; it is disabled by default
  in this release, because the mobile apps don't support it yet.
- Added documentation on alternative production deployment options.
- Added Gitter and HipChat data import tools.
- Added support for using both LDAPAuthBackend and EmailAuthBackend.
- Added support for rendering message content written in right-to-left
  languages in a right-to-left style.
- Added support for compose keyboard shortcuts in message edit UI.
- Added a fast database index supporting the "Private messages" narrow.
- Added a notification setting for whether to send "new login" emails.
- Dramatically expanded our API documentation to cover many more endpoints.
- Optimized the performance of loading Zulip in an organization with
  thousands of users and hundreds of bot users.
- Optimized production release tarballs to save about 40MB of size.
- Dropped support for the EmojiOne and Apple emoji sets, and added
  support for the Google modern emoji set.
- Removed the "Delete streams" administration page; one can delete
  streams directly on "Manage streams".
- Removed support code for the (long-deprecated) legacy desktop app.
- Fixed several bugs with progress bars when uploading files.
- Fixed several bugs in `manage.py register_server`.
- Fixed several minor real-time sync issues with stream settings.
- Fixed some tricky corner cases with the webapp's caching model and
  narrowing to the first unread message.
- Fixed confusing intermediate states of group PMs online indicators.
- Fixed several subtle unread count corner case bugs.
- Fixed several installer issues to make it easier to Dockerize Zulip.
- Fixed several subtle issues with both the LDAP/Active Directory
  integration and its documentation, making it much easier to set up.
- Fixed several minor bugs and otherwise optimized search typeahead.
- Fixed a bad nginx configuration interaction with servers that have
  misconfigured IPv6.
- Fixed most of the caveats on the Slack data import tool.
- Fixed memcached cache size issues for organizations over 10,000 users.
- Zulip's data export system has full support for all features, and
  tests to ensure that it stays that way.
- Rewrote user documentation for dozens of integrations.
- Rewrote the GitHub authentication backend (and more generally our
  python-social-auth integration) to make it easier to add new auth methods.
- Upgraded to modern versions of most of our stale dependencies.
- Updated our CSS toolchain to support hot module reloading.
- Updated numerous pages within the /help/ site.
- We no longer require re-authing to signup after trying to log in with
  an OAuth authentication backend (GitHub or Google).
- Made major improvements to the Help Center.
- Improved system for configuring the S3 file uploads backend.
- Improved emoji typeahead sorting.
- Improved Zulip's layout for windows with a width around 1024px.
- Improved Zulip's generic error handling behavior for webhooks.
- Improved keyboard navigation of settings and popovers.
- Renamed "realm filters" to "linkifiers", at least in the UI.
- Converted several layered-checkbox settings to clearer dropdowns.
- Cleaned up some legacy APIs still using email addresses.
- Made arrow-key navigation work within right and left sidebar search.
- Fixed performance issues of the right sidebar user list with 5000+
  user accounts on a server.
- Emails and several other onboarding strings are now tagged for
  translation.
- Optimized the performance of importing Zulip by about 30%.  This
  significantly decreases the load spike when restarting a Zulip server.
- Optimized the performance of development provisioning; a no-op
  provision now completes in about 3.5s.
- Migrated our static asset pipeline to webpack.
- Our steady work on codebase quality and our automated test suite
  continues.  Backend test coverage is now an incredible 98%.

## Zulip 1.8.x series

### 1.8.1 -- 2018-05-07

- Added an automated tool (`manage.py register_server`) to sign up for
  the [mobile push notifications service](../production/mobile-push-notifications.md).
- Improved rendering of block quotes in mobile push notifications.
- Improved some installer error messages.
- Fixed several minor bugs with the new Slack import feature.
- Fixed several visual bugs with the new compose input pills.
- Fixed several minor visual bugs with night mode.
- Fixed bug with visual clipping of "g" in the left sidebar.
- Fixed an issue with the LDAP backend users' Organization Unit (OU)
  being cached, resulting in trouble logging in after a user was moved
  between OUs.
- Fixed a couple subtle bugs with muting.

### 1.8.0 -- 2018-04-17

#### Highlights
- Dramatically simplified the server installation process; it's now possible
  to install Zulip without first setting up outgoing email.
- Added experimental support for importing an organization's history
  from Slack.
- Added a new "night mode" theme for dark environments.
- Added a video call integration powered by Jitsi.
- Lots of visual polish improvements.
- Countless small bugfixes both in the backend and the UI.


**Security and privacy:**
- Several important security fixes since 1.7.0, which were released
  already in 1.7.1 and 1.7.2.
- The security model for private streams has changed.  Now
  organization administrators can remove users, edit descriptions, and
  rename private streams they are not subscribed to.  See Zulip's
  security model documentation for details.
- On Xenial, the local uploads backend now does the same security
  checks that the S3 backend did before serving files to users.
  Ubuntu Trusty's version of nginx is too old to support this and so
  the legacy model is the default; we recommend upgrading.
- Added an organization setting to limit creation of bots.
- Refactored the authentication backends codebase to be much easier to
  verify.
- Added a user setting to control whether email notifications include
  message content (or just the fact that there are new messages).


**Visual and UI:**
- Added a user setting to translate emoticons/smileys to emoji.
- Added a user setting to choose the emoji set used in Zulip: Google,
  Twitter, Apple, or Emoji One.
- Expanded setting for displaying emoji as text to cover all display
  settings (previously only affected reactions).
- Overhauled our settings system to eliminate the old "save changes"
  button system.
- Redesigned the "uploaded files" UI.
- Redesigned the "account settings" UI.
- Redesigned error pages for the various email confirmation flows.
- Our emoji now display at full resolution on retina displays.
- Improved placement of text when inserting emoji via picker.
- Improved the descriptions and UI for many settings.
- Improved visual design of the help center (/help/).


**Core chat experience:**
- Added support for mentioning groups of users.
- Added a setting to allow users to delete their messages.
- Added support for uploading files in the message-edit UI.
- Redesigned the compose are for private messages to use pretty pills
  rather than raw email addresses to display recipients.
- Added new Ctrl+B, Ctrl+I, Ctrl+L compose shortcuts for inserting
  common syntax.
- Added warning when linking to a private stream via typeahead.
- Added support for automatically-numbered Markdown lists.
- Added a big warning when posting to #announce.
- Added a notification when drafts are saved, to make them more
  discoverable.
- Added a fast local echo to emoji reactions.
- Messages containing just a link to an image (or an uploaded image)
  now don't clutter the feed with the URL: we just display the image.
- Redesigned the API for emoji reactions to support the full range of
  how emoji reactions are used.
- Fixed most of the known (mostly obscure) bugs in how messages are
  formatted in Zulip.
- Fixed "more topics" to correctly display all historical topics for
  public streams, even though from before a user subscribed.
- Added a menu item to mark all messages as read.
- Fixed image upload file pickers offering non-image files.
- Fixed some subtle bugs with full-text search and Unicode.
- Fixed bugs in the "edit history" HTML rendering process.
- Fixed popovers being closed when new messages come in.
- Fixed unexpected code blocks when using the email mirror.
- Fixed clicking on links to a narrow opening a new window.
- Fixed several subtle bugs with the email gateway system.
- Fixed layering issues with mobile Safari.
- Fixed several obscure real-time synchronization bugs.
- Fixed handling of messages with a very large HTML rendering.
- Fixed several bugs around interacting with deactivated users.
- Fixed interaction bugs with unread counts and deleting messages.
- Fixed support for replacing deactivated custom emoji.
- Fixed scrolling downwards in narrows.
- Optimized how user avatar URLs are transmitted over the wire.
- Optimized message sending performance a bit more.
- Fixed a subtle and hard-to-reproduce bug that resulted in every
  message being condensed ([More] appearing on every message).
- Improved typeahead's handling of editing an already-completed mention.
- Improved syntax for inline LaTeX to be more convenient.
- Improved syntax for permanent links to streams in Zulip.
- Improved behavior of copy-pasting a large number of messages.
- Improved handling of browser undo in compose.
- Improved saved drafts system to garbage-collect old drafts and sort
  by last modification, not creation.
- Removed the legacy "Zulip labs" autoscroll_forever setting.  It was
  enabled mostly by accident.
- Removed some long-deprecated Markdown syntax for mentions.
- Added support for clicking on a mention to see a user's profile.
- Links to logged-in content in Zulip now take the user to the
  appropriate upload or view after a user logs in.
- Renamed "Home" to "All messages", to avoid users clicking on it too
  early in using Zulip.
- Added a user setting to control whether the organization's name is
  included in email subject lines.
- Fixed uploading user avatars encoded using the CMYK mode.


**User accounts and invites:**
- Added support for users in multiple realms having the same email.
- Added a display for whether the user is logged-in in logged-out
  pages.
- Added support for inviting a new user as an administrator.
- Added a new organization settings page for managing invites.
- Added rate-limiting on inviting users to join a realm (prevents spam).
- Added an organization setting to disable welcome emails to new users.
- Added an organization setting to ban disposable email addresses
  (I.e.. those from sites like mailinator.com).
- Improved the password reset flow to be less confusing if you don't
  have an account.
- Split the Notifications Stream setting in two settings, one for new
  users, the other for new streams.


**Stream subscriptions and settings:**
- Added traffic statistics (messages/week) to the "Manage streams" UI.
- Fixed numerous issues in the "stream settings" UI.
- Fixed numerous subtle bugs with the stream creation UI.
- Changes the URL scheme for stream narrows to encode the stream ID,
  so that they can be robust to streams being renamed.  The change is
  backwards-compatible; existing narrow URLs still work.


**API, bots, and integrations:**
- Rewrote our API documentation to be much more friendly and
  expansive; it now covers most important endpoints, with nice examples.
- New integrations: ErrBot, GoCD, Google Code-In, Opbeat, Groove,
  Raygun, Insping, Dialogflow, Dropbox, Front, Intercom,
  Statuspage.io, Flock and Beeminder.
- Added support for embedded interactive bots.
- Added inline preview + player for Vimeo videos.
- Added new event types and fixed bugs in several webhook integrations.
- Added support for default bots to receive messages when they're
  mentioned, even if they are not subscribed.
- Added support for overriding the topic is all incoming webhook integrations.
- Incoming webhooks now send a private message to the bot owner for
  more convenient testing if a stream is not specified.
- Rewrote documentation for many integrations to use a cleaner
  numbered-list format.
- APIs for fetching messages now provide more metadata to help clients.


**Keyboard shortcuts:**
- Added new "basics" section to keyboard shortcuts documentation.
- Added a new ">" keyboard shortcut for quote-and-reply.
- Added a new "p" keyboard shortcut to jump to next unread PM thread.
- Fixed several hotkeys scope bugs.
- Changed the hotkey for compose-private-message from "C" to "x".
- Improve keyboard navigation of left and right sidebars with arrow keys.


**Mobile apps backend:**
- Added support for logging into the mobile apps with RemoteUserBackend.
- Improved mobile notifications to support narrowing when one clicks a
  mobile push notification.
- Statistics on the fraction of strings that are translated now
  include strings in the mobile apps as well.


**For server admins:**
- Added certbot support to the installer for getting certificates.
- Added support for hosting multiple domains, not all as subdomains of
  the same base domain.
- Added a new nagios check for the Zulip analytics state.
- Fixed buggy APNs logic that could cause extra exception emails.
- Fixed a missing dependency for the localhost_sso auth backend.
- Fixed subtle bugs in garbage-collection of old node_modules versions.
- Clarified instructions for server settings (especially LDAP auth).
- Added missing information on requesting user in many exception emails.
- Improved Tornado retry logic for connecting to RabbitMQ.
- Added a server setting to control whether digest emails are sent.


**For Zulip developers:**
- Migrated the codebase to use the nice Python 3 typing syntax.
- Added a new /team/ page explaining the team, with a nice
  visualization of our contributors.
- Dramatically improved organization of developer docs.
- Backend test coverage is now 95%.

#### Upgrade notes for 1.8.0

This major release has no special upgrade notes.

## Zulip 1.7.x series

### 1.7.2 -- 2018-04-12

This is a security release, with a handful of cherry-picked changes
since 1.7.1.  All Zulip server admins are encouraged to upgrade
promptly.

- CVE-2018-9986: Fix XSS issues with frontend Markdown processor.
- CVE-2018-9987: Fix XSS issue with muting notifications.
- CVE-2018-9990: Fix XSS issue with stream names in topic typeahead.
- CVE-2018-9999: Fix XSS issue with user uploads.  The fix for this
  adds a Content-Security-Policy for the `LOCAL_UPLOADS_DIR` storage
  backend for user-uploaded files.

Thanks to Suhas Sunil Gaikwad for reporting CVE-2018-9987 and w2w for
reporting CVE-2018-9986 and CVE-2018-9990.

### 1.7.1 -- 2017-11-21

This is a security release, with a handful of cherry-picked changes
since 1.7.0.  All Zulip server admins are encouraged to upgrade
promptly.

This release includes fixes for the upgrade process, so server admins
running a version from before 1.7 should upgrade directly to 1.7.1.

- CVE-2017-0910: On a server with multiple realms, a vulnerability in
  the invitation system allowed an authorized user of one realm to
  create an account on any other realm.
- The Korean translation is now complete, a huge advance from almost
  nothing in 1.7.0.  The French translation is now nearly complete,
  and several other languages have smaller updates.
- The installer now sets LC_ALL to a known locale, working around an
  issue where some dependencies fail to install in some locales.
- We fixed a bug in the script that runs after upgrading Zulip (so
  the fix applies when upgrading to this version), where the
  garbage-collection of old deployments sometimes wouldn't preserve
  the immediate last deployment.

### 1.7.0 -- 2017-10-25

#### Highlights

**Web**

- We’ve completely redesigned our onboarding process to explain Zulip,
  and especially topics, to new users.
- We’ve built a beautiful new emoji picker with categories, a
  showcase, and much better data. Note the clean, underscore-free
  display!
- The emails sent by Zulip are more consistent, readable, and visually
  interesting.
- Chinese (Simplified) and Japanese join Spanish, German, and Czech in
  having the user interface fully translated, in addition to partial
  translations for many other languages. We also fixed many small
  issues where strings weren’t tagged for translation.
- Many pages have been redesigned to be easier to use and visually
  cleaner, including the settings pages and the user documentation at
  /help, /integrations, and /apps.

**Mobile and Desktop support**

- Zulip Server 1.7 adds several new APIs that are critical for mobile
  app performance and that let the app track unread messages. If
  you’re using the mobile apps at all (iOS or Android), you will
  definitely want to upgrade to Zulip 1.7.
- The iOS and Android apps can receive push notifications
  (configurable, naturally) for events like PMs and @-mentions. While
  Zulip Server 1.6 has basic support for these, 1.7 brings a new,
  clearer format to notifications, and gives each user more options
  for finer-grained control.
- The new Electron desktop app is out of beta and replaces our legacy
  desktop apps.

**Backend and scaling**

- Zulip now runs exclusively on Python 3.  This is the culmination of
  an 18-month migration effort.  We are very excited about this!
- We’ve added an automatic "soft deactivation" process, which
  dramatically improves performance for organizations with a large
  number of inactive users, without any impact on those users’
  experience if they later come back.
- Zulip's performance at scale has improved significantly. Performance
  now scales primarily with number of active users (not total
  users). As an example, chat.zulip.org serves 400 monthly active
  users and about 3500 total users, on one VM with just 8GB of RAM and
  a CPU consistently over 90% idle.

#### Upgrade notes for 1.7.0

* Zulip 1.7 contains some significant database migrations that can
  take several minutes to run.  The upgrade process automatically
  minimizes disruption by running these first, before beginning the
  user-facing downtime.  However, if you'd like to watch the downtime
  phase of the upgrade closely, we recommend
  [running them first manually](../production/expensive-migrations.md) and as well
  as the usual trick of
  doing an apt upgrade first.

* We've removed support for an uncommon legacy deployment model where
  a Zulip server served multiple organizations on the same domain.
  Installs with multiple organizations now require each organization
  to have its own subdomain.

  This change should have no effect for the vast majority of Zulip
  servers that only have one organization.  If you manage a server
  that hosts multiple organizations, you'll want to read [our guide on
  multiple organizations](../production/multiple-organizations.md).

* We simplified the configuration for our password strength checker to
  be much more intuitive.  If you were using the
  `PASSWORD_MIN_ZXCVBN_QUALITY` setting,
  [it has been replaced](https://github.com/zulip/zulip/commit/a116303604e362796afa54b5d923ea5312b2ea23) by
  the more intuitive `PASSWORD_MIN_GUESSES`.

#### Full feature changelog

- Simplified the process for installing a new Zulip server, as well as
  fixing the most common roadbumps and confusing error messages.
- Added a new "incoming webhook" bot type, limited to only sending
  messages into Zulip, for better security.
- Added experimental support for outgoing webhooks.
- Added support for changing the notifications stream.
- Added 'u' hotkey to show a user's profile.
- Added '-' hotkey to toggle collapsing a message.
- Added an organization setting to require topics in stream messages.
- Added an organization setting to control whether edit history is available.
- Added a confirmation dialogue when inviting many users to a new stream.
- Added new notification setting to always get push notifications on a stream.
- Added new "getting started" guides to the user documentation.
- Added support for installing a Zulip server from a Git checkout.
- Added support for mentioning a user when editing a message.
- Added OpsGenie, Google Code-In, Google Search, and xkcd integrations.
- Added support for organization administrators deleting private streams.
- Added support for using any LDAP attribute for login username.
- Added support for searching by group-pm-with.
- Added support for mentioning users when editing messages.
- Added a much prettier prompt for enabling desktop notifications.
- Added a new PHYSICAL_ADDRESS setting to be used in outgoing emails
  to support compliance with anti-spam regulations.
- Dramatically improved the search typeahead experience when using
  multiple operators.
- Improved design for /stats page and added a link to it in the gear menu.
- Improved how timestamps are displayed across the product.
- Improved the appearance of mention/compose typeahead.
- Improved lightbox to support panning and zooming on images.
- Improved "more topics" to fetch all historical topics from the server.
- Improved scrollbars across the site to look good on Windows and Linux.
- Improved visual design of stream management UI.
- Improved management of disk space, especially when deploying with
  Git frequently.
- Improve mention typeahead sort order to prioritize recent senders in
  a stream.
- Swapped the 'q' and 'w' hotkeys to better match the UI.
- Fixed most issues with the registration flow, including adding OAuth
  support for mobile and many corner case problems.
- Significantly improved sort ordering for the emoji picker.
- Fixed most accessibility errors detected by major accessibility
  checker tools.
- Extracted Zulip's Python API and bots ecosystem into its own
  repository, zulip/python-zulip-api.
- Enter hotkey now opens compose in empty narrows.
- Significantly improved performance of "starred messages" and
  "mentions" database queries through new indexes.
- Upgraded to Django 1.11.x.
- Upgraded to a more modern version of the SourceSansPro font.
- Redesigned several settings subpages to be visually cleaner.
- Redesigned Zulip's error pages to feature cute illustrations.
- Dramatically improved the user typeahead algorithm to suggest
  relevant users even in large organizations with 1000s of accounts.
- Fixed log rotation structural issues which wasted a lot of disk.
- Updated notification settings to not require a "save changes" button.
- Rewrote the documentation for almost all of our integrations to be
  much clearer and more consistent through use of Markdown and macros.
- Restructured Zulip's management commands to use a common system for
  accessing realms and users.
- Made starting editing a message you just sent not require a round trip.
- Dramatically increased test coverage of the frontend codebase.
- Dramatically improved the responsive mobile user experience.
- Changed the right sidebar search to ignore diacritics.
- Overhauled error handling in the new user registration flows.
- Fixed minor bugs in several webhook integrations.
- Fixed several local echo bugs involving mentions and line-wrapping.
- Fixed various inconsistent old-style buttons in settings pages.
- Fixed some obscure bugs with uploading files.
- Fixed issues with deactivating realm emoji.
- Fixed rendering of emoji in tweet previews.
- Fixed buggy translation caching which filled local storage.
- Fixed handling of desktop and mobile apps in new-login emails.
- Fixed caching of source repository in upgrade-zulip-from-git.
- Fixed numerous minor internationalization bugs.
- Fixed several bugs with the LDAP authentication backend.
- Fixed several corner case bugs with push notification.
- Fixed rendering of realm emoji in missed-message emails.
- Fixed various endpoints incorrectly using the PUT HTTP method.
- Fixed bugs in scrolling up using the home key repeatedly.
- Fixed a bug where private messages from multiple users could be
  included in a single missed-message email.
- Fixed issues with inconsistent visual display of @-all mentions.
- Fixed zombie process leaks on servers with <4GB of RAM.
- Fixed Markdown previews of /me messages.
- Fixed a subtle bug involving timestamps of locally echoed messages.
- Fixed the behavior of key combintions like Ctrl+Enter in the compose box.
- Worked around Google Compute Engine's default boto configuration,
  which broke Zulip (and any other app using boto).
- Zulip now will gracefully handle the PostgreSQL server being restarted.
- Optimized marking an entire topic as read.
- Switched from npm to yarn for downloading JS packages.
- Switched the function of the 'q' and 'w' search hotkeys.
- Simplified the settings for configuring senders for our emails.
- Emoji can now be typed with spaces, e.g. entering "robot face" in
  the typeahead as well as "robot_face".
- Improved title and alt text for Unicode emoji.
- Added development tools to make iterating on emails and error pages easy.
- Added backend support for multi-use invite links (no UI for creating yet).
- Added a central debugging log for attempts to send outgoing emails.
- Added a deprecation notice for the legacy QT-based desktop app.
- Removed most remaining legacy API format endpoints.
- Removed the obsolete shortname-based syntax.
- Removed the old django-guardian dependency.
- Removed several obsolete settings.
- Partially completed migration to webpack as our static asset bundler.

## Zulip 1.6.x and older

### 1.6.0 -- 2017-06-06

#### Highlights

- A complete visual redesign of the logged-out pages, including login,
registration, integrations, etc.
- New visual designs for numerous UI elements, including the emoji
picker, user profile popovers, sidebars, compose, and many more.
- A complete redesign of the Zulip settings interfaces to look a lot
nicer and be easier to navigate.
- Organization admins can now configure the login and registration
pages to show visitors a nice organization profile with custom text
and images, written in Markdown.
- Massively improved performance for presence and settings pages,
especially for very large organizations (1000+ users).
- A dozen useful new keyboard shortcuts, from editing messages to
emoji reactions to drafts and managing streams.
- Typing notifications for private message threads.
- Users can now change their own email address.
- New saved-drafts feature.
- The server can now run on a machine with as little as 2GB of RAM.
- The new [Electron desktop app][electron-app] and new
[React Native mobile app for iOS][ios-app] are now the recommended
Zulip apps.
- Mobile web now works much better, especially on iOS.
- Support for sending mobile push notifications via
[a new forwarding service][mobile-push]
- Complete translations for Spanish, German, and Czech (and
  expanded partial translations for Japanese, Chinese, French,
  Hungarian, Polish, Dutch, Russian, Bulgarian, Portuguese,
  Serbian, Malayalam, Korean, and Italian).

[mobile-push]: ../production/mobile-push-notifications.md
[electron-app]: https://github.com/zulip/zulip-desktop/releases
[ios-app]: https://itunes.apple.com/us/app/zulip/id1203036395

#### Full feature changelog

* Added Basecamp, Gogs, Greenhouse, Home Assistant, Slack, Splunk, and
  WordPress webhook integrations.
* Added LaTeX support to the Markdown processor.
* Added support for filtering branches to all Git integrations.
* Added read-only access to organization-level settings for all users.
* Added UI for managing muted topics and uploaded files.
* Added UI for displaying message edit history.
* Added support for various features needed by new mobile app.
* Added deep links for settings/subscriptions interfaces.
* Added an animation when messages are edited.
* Added support for registration with GitHub auth (not just login).
* Added tracking of uploaded file quotas.
* Added option to display emoji as their alt codes.
* Added new audit log table, to eventually support an auditing UI.
* Added several new permissions-related organization settings.
* Added new endpoint for fetching presence data, useful in employee directories.
* Added typeahead for language for syntax highlighting in code blocks.
* Added support for basic Markdown in stream descriptions.
* Added email notifications on new Zulip logins.
* Added security hardening before serving uploaded files.
* Added new PRIVACY_POLICY setting to provide a Markdown privacy policy.
* Added an icon to distinguish bot users as message senders.
* Added a command-line Slack importer tool using the API.
* Added new announcement notifications on stream creation.
* Added support for some newer Unicode emoji code points.
* Added support for users deleting realm emoji they themselves uploaded.
* Added support for organization administrators deleting messages.
* Extended data available to mobile apps to cover the entire API.
* Redesigned bots UI.  Now can change owners and reactivate bots.
* Redesigned the visuals of code blocks to be prettier.
* Changed right sidebar presence UI to only show recently active users
  in large organizations.  This has a huge performance benefit.
* Changed color for private messages to look better.
* Converted realm emoji to be uploaded, not links, for better robustness.
* Switched the default password hasher for new passwords to Argon2.
* Increased the paragraph spacing, making multi-paragraph.
* Improved formatting of all Git integrations.
* Improved the UI of the /stats analytics pages.
* Improved search typeahead to support group private messages.
* Improved logic for when the compose box should open/close.
* Improved lightbox to support scrolling through images.
* Improved Markdown support for bulleted lists.
* Improved copy-to-clipboard support in various places.
* Improved subject lines of missed message emails.
* Improved handling of users trying to log in with OAuth without an account.
* Improved UI of off-the-Internet errors to not be hidden in narrow windows.
* Improved rate-limiting errors to be more easily machine-readable.
* Parallelized the backend test suite; now runs 1600 tests in <30s.
* Fixed numerous bugs and performance issues with stream management.
* Fixed an issue with the fake emails assigned to bot users.
* Fixed a major performance issue in stream creation.
* Fixed numerous minor accessibility issues.
* Fixed a subtle interaction between click-to-reply and copy-paste.
* Fixed various formatting issues with /me messages.
* Fixed numerous real-time sync issues involving users changing their
  name, avatar, or email address and streams being renamed.
* Fixed numerous performance issues across the project.
* Fixed various left sidebar ordering and live-updated bugs.
* Fixed numerous bugs with the message editing widget.
* Fixed missing logging / rate limiting on browser endpoints.
* Fixed regressions in Zulip's browser state preservation on reload logic.
* Fixed support for Unicode characters in the email mirror system.
* Fixed load spikes when email mirror is receiving a lot of traffic.
* Fixed the ugly grey flicker when scrolling fast on Macs.
* Fixed previews of GitHub image URLs.
* Fixed narrowing via clicking on desktop notifications.
* Fixed Subscribed/Unsubscribed bookends appearing incorrectly.
* Eliminated the idea of a realm having a canonical domain; now
  there's simply the list of allowed domains for new users.
* Migrated avatars to a user-id-based storage setup (not email-based).
* Trailing whitespace is now stripped in code blocks, avoiding
  unnecessary scrollbars.
* Most API payloads now refer to users primarily by user ID, with
  email available for backwards-compatibility.  In the future, we may
  remove email support.
* Cleaned up Zulip's supervisord configuration.  A side effect is the
  names of the log files have changed for all the queue workers.
* Refactored various endpoints to use a single code path for security
  hardening.
* Removed support for the `MANDRILL_CLIENT` setting.  It hadn't been
  used in years.
* Changed `NOREPLY_EMAIL_ADDRESS` setting to `Name <user@example.com>`
  format.
* Disabled the web tutorial on mobile.
* Backend test coverage is now 93%, with 100% in views code.

### 1.5.2 -- 2017-06-01

- CVE-2017-0896: Restricting inviting new users to admins was broken.
- CVE-2015-8861: Insecure old version of handlebars templating engine.

### 1.5.1 -- 2017-02-07

- Fix exception trying to copy node_modules during upgrade process.
- Improved styling of /stats page to remove useless login/register links.

### 1.5.0 -- 2017-02-06

#### Highlights

- Completely redesigned the Manage streams interface.
- Added support for emoji reactions to messages.
- Added a lightbox for viewing images and videos.
- Added an extensive user documentation site at /help/.
- Added admin setting to auto-linkify certain strings (useful for
  issue numbers and Git commit IDs).
- Upgraded how the main application runs from FastCGI on Django 1.8 to
  uwsgi and Django 1.10.
- Added preliminary support for open graph previews of links (the
  setting, `INLINE_URL_EMBED_PREVIEW`, is disabled by default in this
  release).

#### Full feature changelog

- Added an emoji picker/browser to the compose box.
- Added Markdown preview support to the compose box.
- Added a new analytics system to track interesting usage statistics.
- Added a /stats page with graphs of the analytics data.
- Added display of subscriber counts in Manage streams.
- Added support for filtering streams in Manage streams.
- Added support for setting a stream description on creation.
- Added support for copying subscribers from existing streams on creation.
- Added several new search/filtering UI elements.
- Added UI for deactivating your own Zulip account.
- Added support for viewing the raw Markdown content of a message.
- Added support for deploying Zulip with subdomains for each realm.
  This entailed numerous changes to ensure a consistent experience.
- Added support for (optionally) using PGRoonga to support full-text
  search in all languages (not just English).
- Added AppFollow, GitLab, Google Calendar, GoSquared, HelloSign,
  Heroku, Librato, MailChimp, Mention, Papertrail, Sentry, Solano
  Labs, Stripe and Zapier integrations.
- Added a webhook integration for GitHub, replacing the deprecated
  github-services hook.
- Normalized the message formatting for all the Zulip Git integrations.
- Added support for VMware Fusion Vagrant provider for faster OSX
  development.
- Added a shields.io style badge for joining a Zulip server.
- Added admin setting for which email domains can join a realm.
- Added admin setting for controlling who can create streams.
- Added admin setting to limit stream creation to older users.
- Added a notification when you muted a topic.
- Added a new hotkey for muting/unmuting topics.
- Added support for testing websockets to the Nagios plugins.
- Added a configuration option to disable websockets.
- Added support for removing one's own Zulip account.
- Added support for realm admins which auth backends are supported.
- Added new organization type concept.  This will be used to control
  whether Zulip is optimized around protecting user privacy
  vs. administrative control.
- Added #**streamName** syntax for linking to a stream.
- Added support for viewing Markdown source of messages.
- Added setting to always send push notifications.
- Added setting to hide private message content in desktop
  notifications.
- Added buttons to download .zuliprc files.
- Added italics and strikethrough support in Markdown implementation.
- Added errors for common installations mistakes (e.g. too little RAM).
- Added a new /authors page showing the contributors to the current
  Zulip version.
- Added illustrations to the 404 and 500 pages.
- Upgraded all Python dependencies to modern versions, including
  Django 1.10 (all of Zulip's patches have been merged into mainline).
- Increased backend test coverage of Python codebase to 90%.
- Increased mypy static type coverage of Python code to 100%.
- Added several new linters (eslint, pep8) and cleaned the codebase.
- Optimized the speed of the Zulip upgrade process, especially with Git.
- Have peer_add events send user_id, not email.
- Fixed problems with RabbitMQ when installing Zulip.
- Fixed JavaScript not being gzip-compressed properly.
- Fixed a major performance bug in the Tornado service.
- Fixed a frontend performance bug creating streams in very large realms.
- Fixed numerous bugs where strings were not properly tagged for translation.
- Fixed several real-time sync bugs, and removed several AJAX calls.
  Zulip should be more performant than ever before.
- Fixed Zulip Tornado service not working with http_proxy set in environment.
- Fixed text overflow in stream subscriptions.
- Fixed CSS issues with message topic editing.
- Fixed several transactionality bugs (e.g. in Huddle creation).
- Fixed missed-message email configuration error handling.
- Fixed annoying @-mentions in Jira integration.
- Fixed various mismatches between frontend and backend Markdown
  implementations.
- Fixed various popover-related UI bugs.
- Fixed duplicate notifications with multiple open Zulip tabs.
- Fixed support for emailing the server administrator about backend exceptions.
- Cleaned up the "edit message" form.
- Eliminated most of the legacy API endpoints.
- Improved typeahead and autocomplete across the application.
  Highlights include much better handling of many users with similar names.
- Improved the color scheme for code blocks.
- Improved the message editing UI in several ways.
- Improved how dates are displayed in the UI.
- Improved default settings for zxcvbn password strength checker.
- Upgraded jQuery to the latest 1.12 release.
- Made numerous improvements to the development tooling.
- Made extensive improvements to code organization.
- Restyled all the registration pages to look nicer and be responsive.
- Extensively refactored views to use common functions for fetching
  stream and message objects.
- Suppressed @-all mentions being treated as mentions on muted
  streams.
- Documented preliminary design for interactive bot system.

### 1.4.3 - 2017-01-29

- CVE-2017-0881: Users could subscribe to invite-only streams.

### 1.4.2 - 2016-09-27

- Upgraded Django to version 1.8.15 (with the Zulip patches applied),
  fixing a CSRF vulnerability in Django (see
  https://www.djangoproject.com/weblog/2016/sep/26/security-releases/),
  and a number of other Django bugs from past Django stable releases
  that largely affects parts of Django that are not used by Zulip.
- Fixed buggy logrotate configuration.

### 1.4.1 - 2016-09-03

- Fixed settings bug upgrading from pre-1.4.0 releases to 1.4.0.
- Fixed local file uploads integration being broken for new 1.4.0
  installations.

### 1.4.0 - 2016-08-25

- Migrated Zulip's python dependencies to be installed via a virtualenv,
  instead of the via apt.  This is a major change to how Zulip
  is installed that we expect will simplify upgrades in the future.
- Fixed unnecessary loading of zxcvbn password strength checker.  This
  saves a huge fraction of the uncached network transfer for loading
  Zulip.
- Added support for using Ubuntu Xenial in production.
- Added a powerful and complete realm import/export tool.
- Added nice UI for selecting a default language to display settings.
- Added UI for searching streams in left sidebar with hotkeys.
- Added Semaphore, Bitbucket, and HelloWorld (example) integrations.
- Added new webhook-based integration for Trello.
- Added management command for creating realms through web UI.
- Added management command to send password reset emails.
- Added endpoint for mobile apps to query available auth backends.
- Added Let's Encrypt documentation for getting SSL certificates.
- Added nice rendering of Unicode emoji.
- Added support for pinning streams to the top of the left sidebar.
- Added search box for filtering user list when creating a new stream.
- Added realm setting to disable message editing.
- Added realm setting to time-limit message editing.  Default is 10m.
- Added realm setting for default language.
- Added year to timestamps in message interstitials for old messages.
- Added GitHub authentication (and integrated python-social-auth, so it's
  easy to add additional social authentication methods).
- Added TERMS_OF_SERVICE setting using Markdown formatting to configure
  the terms of service for a Zulip server.
- Added numerous hooks to Puppet modules to enable more configurations.
- Moved several useful Puppet components into the main Puppet
  manifests (setting a Redis password, etc.).
- Added automatic configuration of PostgreSQL/memcached settings based
  on the server's available RAM.
- Added scripts/upgrade-zulip-from-git for upgrading Zulip from a Git repo.
- Added preliminary support for Python 3.  All of Zulip's test suites now
  pass using Python 3.4.
- Added support for `Name <email@example.com>` format when inviting users.
- Added numerous special-purpose settings options.
- Added a hex input field in color picker.
- Documented new Electron beta app and mobile apps in the /apps/ page.
- Enabled Android Google authentication support.
- Enhanced logic for tracking origin of user uploads.
- Improved error messages for various empty narrows.
- Improved missed message emails to better support directly replying.
- Increased backend test coverage of Python code to 85.5%.
- Increased mypy static type coverage of Python code to 95%.  Also
  fixed many string annotations to properly handle Unicode.
- Fixed major i18n-related frontend performance regression on
  /#subscriptions page.  Saves several seconds of load time with 1k
  streams.
- Fixed Jinja2 migration bug when trying to register an email that
  already has an account.
- Fixed narrowing to a stream from other pages.
- Fixed various frontend strings that weren't marked for translation.
- Fixed several bugs around editing status (/me) messages.
- Fixed queue workers not restarting after changes in development.
- Fixed Casper tests hanging while development server is running.
- Fixed browser autocomplete issue when adding new stream members.
- Fixed broken create_stream and rename_stream management commands.
- Fixed zulip-puppet-apply exit code when puppet throws errors.
- Fixed EPMD restart being attempted on every puppet apply.
- Fixed message cache filling; should improve perf after server restart.
- Fixed caching race condition when changing user objects.
- Fixed buggy Puppet configuration for supervisord restarts.
- Fixed some error handling race conditions when editing messages.
- Fixed fastcgi_params to protect against the httpoxy attack.
- Fixed bug preventing users with mit.edu emails from registering accounts.
- Fixed incorrect settings docs for the email mirror.
- Fixed APNS push notification support (had been broken by Apple changing
  the APNS API).
- Fixed some logic bugs in how attachments are tracked.
- Fixed unnecessarily resource-intensive RabbitMQ cron checks.
- Fixed old deployment directories leaking indefinitely.
- Fixed need to manually add localhost in ALLOWED_HOSTS.
- Fixed display positioning for the color picker on subscriptions page.
- Fixed escaping of Zulip extensions to Markdown.
- Fixed requiring a reload to see newly uploaded avatars.
- Fixed @all warning firing even for `@all`.
- Restyled password reset form to look nice.
- Improved formatting in reset password links.
- Improved alert words UI to match style of other settings.
- Improved error experience when sending to nonexistent users.
- Portions of integrations documentation are now automatically generated.
- Restructured the URLs files to be more readable.
- Upgraded almost all Python dependencies to current versions.
- Substantially expanded and reorganized developer documentation.
- Reorganized production documentation and moved to ReadTheDocs.
- Reorganized .gitignore type files to be written under var/
- Refactored substantial portions of templates to support subdomains.
- Renamed local_settings.py symlink to prod_settings.py for clarity.
- Renamed email-mirror management command to email_mirror.
- Changed HTTP verb for create_user_backend to PUT.
- Eliminated all remaining settings hardcoded for zulip.com.
- Eliminated essentially all remaining hardcoding of mit.edu.
- Optimized the performance of all the test suites.
- Optimized Django memcached configuration.
- Removed old prototype data export tool.
- Disabled insecure RC4 cipher in nginx configuration.
- Enabled shared SSL session cache in nginx configuration.
- Updated header for Zulip static assets to reflect Zulip being
  open source.

### 1.3.13 - 2016-06-21
- Added nearly complete internationalization of the Zulip UI.
- Added warning when using @all/@everyone.
- Added button offering to subscribe at bottom of narrows to streams
  the user is not subscribed to.
- Added integrations with Airbrake, CircleCI, Crashlytics, IFTTT,
  Transifex, and Updown.io.
- Added menu option to mark all messages in a stream or topic as read.
- Added new Attachment model to keep track of uploaded files.
- Added caching of virtualenvs in development.
- Added mypy static type annotations to about 85% of the Zulip Python codebase.
- Added automated test of backend templates to test for regressions.
- Added lots of detailed documentation on the Zulip development environment.
- Added setting allowing only administrators to create new streams.
- Added button to exit the Zulip tutorial early.
- Added web UI for configuring default streams.
- Added new OPEN_REALM_CREATION setting (default off), providing a UI
  for creating additional realms on a Zulip server.
- Fixed email_gateway_password secret not working properly.
- Fixed missing helper scripts for RabbitMQ Nagios plugins.
- Fixed skipping forward to latest messages ("More messages below" button).
- Fixed netcat issue causing Zulip installation to hang on Scaleway machines.
- Fixed rendering of /me status messages after message editing.
- Fixed case sensitivity of right sidebar fading when compose is open.
- Fixed error messages when composing to invalid PM recipients.
- Fixed LDAP auth backend not working with Zulip mobile apps.
- Fixed erroneous WWW-Authenticate headers with expired sessions.
- Changed "coworkers" to "users" in the Zulip UI.
- Changed add_default_stream REST API to correctly use PUT rather than PATCH.
- Updated the Zulip emoji set (the Android emoji) to a modern version.
- Made numerous small improvements to the Zulip development experience.
- Migrated backend templates to the faster Jinja2 templating system.
- Migrated development environment setup scripts to tools/setup/.
- Expanded test coverage for several areas of the product.
- Simplified the API for writing new webhook integrations.
- Removed most of the remaining JavaScript global variables.

### 1.3.12 - 2016-05-10
- CVE-2016-4426: Bot API keys were accessible to other users in the same realm.
- CVE-2016-4427: Deactivated users could access messages if SSO was enabled.
- Fixed a RabbitMQ configuration bug that resulted in reordered messages.
- Added expansive test suite for authentication backends and decorators.
- Added an option to logout_all_users to delete only sessions for deactivated users.

### 1.3.11 - 2016-05-02
- Moved email digest support into the default Zulip production configuration.
- Added options for configuring PostgreSQL, RabbitMQ, Redis, and memcached
  in settings.py.
- Added documentation on using Hubot to integrate with useful services
  not yet integrated with Zulip directly (e.g. Google Hangouts).
- Added new management command to test sending email from Zulip.
- Added Codeship, Pingdom, Taiga, Teamcity, and Yo integrations.
- Added Nagios plugins to the main distribution.
- Added ability for realm administrators to manage custom emoji.
- Added guide to writing new integrations.
- Enabled camo image proxy to fix mixed-content warnings for http images.
- Refactored the Zulip Puppet modules to be more modular.
- Refactored the Tornado event system, fixing old memory leaks.
- Removed many old-style /json API endpoints
- Implemented running queue processors multithreaded in development,
  decreasing RAM requirements for a Zulip development environment from
  ~1GB to ~300MB.
- Fixed rerendering the complete buddy list whenever a user came back from
  idle, which was a significant performance issue in larger realms.
- Fixed the disabling of desktop notifications from 1.3.7 for new users.
- Fixed the (admin) create_user API enforcing restricted_to_domain, even
  if that setting was disabled for the realm.
- Fixed bugs changing certain settings in administration pages.
- Fixed collapsing messages in narrowed views.
- Fixed 500 errors when uploading a non-image file as an avatar.
- Fixed Jira integration incorrectly not @-mentioning assignee.

### 1.3.10 - 2016-01-21
- Added new integration for Travis CI.
- Added settings option to control maximum file upload size.
- Added support for running Zulip development environment in Docker.
- Added easy configuration support for a remote PostgreSQL database.
- Added extensive documentation on scalability, backups, and security.
- Recent private message threads are now displayed expanded similar to
  the pre-existing recent topics feature.
- Made it possible to set LDAP and EMAIL_HOST passwords in
  /etc/zulip/secrets.conf.
- Improved the styling for the Administration page and added tabs.
- Substantially improved loading performance on slow networks by enabling
  GZIP compression on more assets.
- Changed the page title in narrowed views to include the current narrow.
- Fixed several backend performance issues affecting very large realms.
- Fixed bugs where draft compose content might be lost when reloading site.
- Fixed support for disabling the "zulip" notifications stream.
- Fixed missing step in postfix_localmail installation instructions.
- Fixed several bugs/inconveniences in the production upgrade process.
- Fixed realm restrictions for servers with a unique, open realm.
- Substantially cleaned up console logging from run-dev.py.

### 1.3.9 - 2015-11-16
- Fixed buggy #! lines in upgrade scripts.

### 1.3.8 - 2015-11-15
- Added options to the Python API for working with untrusted server certificates.
- Added a lot of documentation on the development environment and testing.
- Added partial support for translating the Zulip UI.
- Migrated installing Node dependencies to use npm.
- Fixed LDAP integration breaking autocomplete of @-mentions.
- Fixed admin panel reactivation/deactivation of bots.
- Fixed inaccurate documentation for downloading the desktop apps.
- Fixed various minor bugs in production installation process.
- Fixed security issue where recent history on private streams might
  be visible to new users (to the Zulip team) who were invited with that
  private stream as one of their initial streams
  (https://github.com/zulip/zulip/issues/230).
- Major preliminary progress towards supporting Python 3.

### 1.3.7 - 2015-10-19
- Turn off desktop and audible notifications for streams by default.
- Added support for the LDAP authentication integration creating new users.
- Added new endpoint to support Google auth on mobile.
- Fixed desktop notifications in modern Firefox.
- Fixed several installation issues for both production and development environments.
- Improved documentation for outgoing SMTP and the email mirror integration.

## Upgrade notes

This section links to the upgrade notes from past releases, so you can
easily read them all when upgrading across multiple releases.

* [Draft upgrade notes for 4.0](#upgrade-notes-for-4-0)
* [Upgrade notes for 3.0](#upgrade-notes-for-3-0)
* [Upgrade notes for 2.1.5](#upgrade-notes-for-2-1-5)
* [Upgrade notes for 2.1.0](#upgrade-notes-for-2-1-0)
* [Upgrade notes for 2.0.0](#upgrade-notes-for-2-0-0)
* [Upgrade notes for 1.9.0](#upgrade-notes-for-1-9-0)
* [Upgrade notes for 1.8.0](#upgrade-notes-for-1-8-0)
* [Upgrade notes for 1.7.0](#upgrade-notes-for-1-7-0)
