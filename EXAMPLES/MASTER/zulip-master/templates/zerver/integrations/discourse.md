On your {{ settings_html|safe }},
[create a bot](/help/add-a-bot-or-integration) for
{{ integration_display_name }}. Make sure that you select
**Incoming webhook** as the **Bot type**:

![Bot types](/static/images/integrations/bot_types.png)

The API keys for "Incoming webhook" bots are limited to only
sending messages via webhooks. Thus, this bot type lessens
the security risks associated with exposing the bot's API
key to third-party services.

Copy the `USERNAME` and `API KEY` - you'll need it later.

Head over to the
[discourse-chat-integration setup instructions](https://meta.discourse.org/t/68501)
and complete them.

{!congrats.md!}

![Discourse chat integration](/static/images/integrations/discourse/001.png)
