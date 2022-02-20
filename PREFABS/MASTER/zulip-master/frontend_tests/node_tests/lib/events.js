"use strict";

//  These events are not guaranteed to be perfectly
//  representative of what the server sends.  We
//  have a tool called check-schemas that tries
//  to validate this data against server side schemas,
//  but there are certain edge cases that the tool now
//  skips.  And even when the data matches the schema,
//  it may not be completely representative.

const test_user = {
    email: "test@example.com",
    user_id: 101,
    full_name: "Test User",
};
exports.test_user = test_user;

exports.test_message = {
    sender_id: test_user.user_id,
    id: 99,
};

const typing_person1 = {
    user_id: 1,
    email: "user1@example.com",
};

const typing_person2 = {
    user_id: 2,
    email: "user2@example.com",
};

exports.typing_person1 = typing_person1;
exports.typing_person2 = typing_person2;

const fake_then = 1596710000;
const fake_now = 1596713966;

exports.test_streams = {
    devel: {
        name: "devel",
        description: ":devel fun:",
        rendered_description: "<b>devel fun</b>",
        invite_only: false,
        stream_id: 101,
        date_created: fake_now,
        first_message_id: 1,
        history_public_to_subscribers: false,
        is_announcement_only: false,
        is_web_public: false,
        message_retention_days: null,
        stream_post_policy: 1,
    },
    test: {
        name: "test",
        description: "test desc",
        rendered_description: "test desc",
        invite_only: true,
        stream_id: 102,
        date_created: fake_then,
        first_message_id: 1,
        history_public_to_subscribers: false,
        is_web_public: false,
        is_announcement_only: false,
        message_retention_days: null,
        stream_post_policy: 1,
    },
};

const streams = exports.test_streams;

exports.test_realm_emojis = {
    101: {
        id: "101",
        name: "spain",
        source_url: "/some/path/to/spain.png",
        deactivated: false,
        author_id: test_user.user_id,
    },
    102: {
        id: "102",
        name: "green_tick",
        author_id: 222,
        deactivated: false,
        source_url: "/some/path/to/emoji",
    },
};

exports.fixtures = {
    alert_words: {
        type: "alert_words",
        alert_words: ["fire", "lunch"],
    },

    attachment__add: {
        type: "attachment",
        op: "add",
        attachment: {
            id: 99,
            name: "foo.png",
            size: 4096,
            path_id: "path_id",
            create_time: fake_now,
            messages: [
                {
                    id: 1000,
                    date_sent: fake_now,
                },
            ],
        },
        upload_space_used: 90000,
    },

    custom_profile_fields__update: {
        type: "custom_profile_fields",
        op: "update",
        fields: [
            {id: 1, name: "teams", type: 1},
            {id: 2, name: "hobbies", type: 1},
        ],
    },

    default_streams: {
        type: "default_streams",
        default_streams: [streams.devel, streams.test],
    },

    delete_message: {
        type: "delete_message",
        message_ids: [1337],
        message_type: "stream",
        stream_id: 99,
        topic: "topic1",
    },

    has_zoom_token: {
        type: "has_zoom_token",
        value: true,
    },

    hotspots: {
        type: "hotspots",
        hotspots: [
            {
                name: "topics",
                title: "About topics",
                description: "Topics are good.",
                delay: 1.5,
            },
            {
                name: "compose",
                title: "Compose box",
                description: "This is where you compose messages.",
                delay: 3.14159,
            },
        ],
    },

    invites_changed: {
        type: "invites_changed",
    },

    muted_topics: {
        type: "muted_topics",
        muted_topics: [
            ["devel", "js", fake_then],
            ["lunch", "burritos", fake_now],
        ],
    },

    presence: {
        type: "presence",
        email: "alice@example.com",
        user_id: 42,
        presence: {
            electron: {
                status: "active",
                timestamp: fake_now,
                client: "electron",
                pushable: false,
            },
        },
        server_timestamp: fake_now,
    },

    reaction__add: {
        type: "reaction",
        op: "add",
        message_id: 128,
        reaction_type: "unicode_emoji",
        emoji_name: "airplane",
        emoji_code: "2708",
        user_id: test_user.user_id,
        user: {
            email: test_user.email,
            full_name: test_user.full_name,
            user_id: test_user.user_id,
        },
    },

    reaction__remove: {
        type: "reaction",
        op: "remove",
        message_id: 256,
        reaction_type: "unicode_emoji",
        emoji_name: "8ball",
        emoji_code: "1f3b1",
        user_id: test_user.user_id,
        user: {
            email: test_user.email,
            full_name: test_user.full_name,
            user_id: test_user.user_id,
        },
    },

    realm__deactivated: {
        type: "realm",
        op: "deactivated",
    },

    realm__update__bot_creation_policy: {
        type: "realm",
        op: "update",
        property: "bot_creation_policy",
        value: 1,
    },

    realm__update__create_stream_policy: {
        type: "realm",
        op: "update",
        property: "create_stream_policy",
        value: 2,
    },

    realm__update__default_code_block_language: {
        type: "realm",
        op: "update",
        property: "default_code_block_language",
        value: "javascript",
    },

    realm__update__default_twenty_four_hour_time: {
        type: "realm",
        op: "update",
        property: "default_twenty_four_hour_time",
        value: false,
    },

    realm__update__disallow_disposable_email_addresses: {
        type: "realm",
        op: "update",
        property: "disallow_disposable_email_addresses",
        value: false,
    },

    realm__update__email_addresses_visibility: {
        type: "realm",
        op: "update",
        property: "email_address_visibility",
        value: 3,
    },

    realm__update__emails_restricted_to_domains: {
        type: "realm",
        op: "update",
        property: "emails_restricted_to_domains",
        value: false,
    },

    realm__update__invite_required: {
        type: "realm",
        op: "update",
        property: "invite_required",
        value: false,
    },

    realm__update__invite_to_stream_policy: {
        type: "realm",
        op: "update",
        property: "invite_to_stream_policy",
        value: 2,
    },

    realm__update__name: {
        type: "realm",
        op: "update",
        property: "name",
        value: "new_realm_name",
    },

    realm__update__notifications_stream_id: {
        type: "realm",
        op: "update",
        property: "notifications_stream_id",
        value: 42,
    },

    realm__update__signup_notifications_stream_id: {
        type: "realm",
        op: "update",
        property: "signup_notifications_stream_id",
        value: 41,
    },

    realm__update_dict__default: {
        type: "realm",
        op: "update_dict",
        property: "default",
        data: {
            allow_message_editing: true,
            message_content_edit_limit_seconds: 5,
            authentication_methods: {
                Google: true,
            },
        },
    },

    realm__update_dict__icon: {
        type: "realm",
        op: "update_dict",
        property: "icon",
        data: {
            icon_url: "icon.png",
            icon_source: "U",
        },
    },

    realm__update_dict__logo: {
        type: "realm",
        op: "update_dict",
        property: "logo",
        data: {
            logo_url: "logo.png",
            logo_source: "U",
        },
    },

    realm__update_dict__night_logo: {
        type: "realm",
        op: "update_dict",
        property: "night_logo",
        data: {
            night_logo_url: "night_logo.png",
            night_logo_source: "U",
        },
    },

    realm_bot__add: {
        type: "realm_bot",
        op: "add",
        bot: {
            email: "the-bot@example.com",
            user_id: 42,
            avatar_url: "/some/path/to/avatar",
            api_key: "SOME_KEY",
            full_name: "The Bot",
            bot_type: 1,
            default_all_public_streams: true,
            default_events_register_stream: "whatever",
            default_sending_stream: "whatever",
            is_active: true,
            owner_id: test_user.user_id,
            services: [],
        },
    },

    realm_bot__delete: {
        type: "realm_bot",
        op: "delete",
        bot: {
            user_id: 42,
        },
    },

    realm_bot__remove: {
        type: "realm_bot",
        op: "remove",
        bot: {
            user_id: 42,
            full_name: "The Bot",
        },
    },

    realm_bot__update: {
        type: "realm_bot",
        op: "update",
        bot: {
            user_id: 4321,
            full_name: "The Bot Has A New Name",
        },
    },

    realm_domains__add: {
        type: "realm_domains",
        op: "add",
        realm_domain: {
            domain: "ramen",
            allow_subdomains: false,
        },
    },

    realm_domains__change: {
        type: "realm_domains",
        op: "change",
        realm_domain: {
            domain: "ramen",
            allow_subdomains: true,
        },
    },

    realm_domains__remove: {
        type: "realm_domains",
        op: "remove",
        domain: "ramen",
    },

    realm_emoji__update: {
        type: "realm_emoji",
        op: "update",
        realm_emoji: exports.test_realm_emojis,
    },

    realm_export: {
        type: "realm_export",
        exports: [
            {
                id: 55,
                export_time: fake_now,
                acting_user_id: test_user.user_id,
                export_url: "/some/path/to/export",
                deleted_timestamp: null,
                failed_timestamp: null,
                pending: true,
            },
        ],
    },

    realm_filters: {
        type: "realm_filters",
        realm_filters: [["#[123]", "ticket %(id)s", 55]],
    },

    realm_user__add: {
        type: "realm_user",
        op: "add",
        person: {
            ...test_user,
            avatar_url: "/some/path/to/avatar",
            avatar_version: 1,
            is_admin: false,
            is_active: true,
            is_owner: false,
            is_bot: false,
            is_guest: false,
            profile_data: {},
            timezone: "America/New_York",
            date_joined: "2020-01-01",
        },
    },

    realm_user__remove: {
        type: "realm_user",
        op: "remove",
        person: {
            full_name: test_user.full_name,
            user_id: test_user.user_id,
        },
    },

    realm_user__update: {
        type: "realm_user",
        op: "update",
        person: {
            user_id: test_user.user_id,
            full_name: "Bob NewName",
        },
    },

    restart: {
        type: "restart",
        immediate: true,
    },

    stream__create: {
        type: "stream",
        op: "create",
        streams: [streams.devel, streams.test],
    },

    stream__delete: {
        type: "stream",
        op: "delete",
        streams: [streams.devel, streams.test],
    },

    stream__update: {
        type: "stream",
        op: "update",
        name: "devel",
        stream_id: 99,
        property: "color",
        value: "blue",
    },

    submessage: {
        type: "submessage",
        submessage_id: 99,
        sender_id: 42,
        msg_type: "stream",
        message_id: 56,
        content: "test",
    },

    subscription__add: {
        type: "subscription",
        op: "add",
        subscriptions: [
            {
                ...streams.devel,
                audible_notifications: true,
                color: "blue",
                desktop_notifications: false,
                email_address: "whatever",
                email_notifications: false,
                in_home_view: false,
                is_muted: true,
                pin_to_top: false,
                push_notifications: false,
                stream_weekly_traffic: 40,
                wildcard_mentions_notify: false,
                role: 20,
                subscribers: [5, 8, 13, 21],
            },
        ],
    },

    subscription__peer_add: {
        type: "subscription",
        op: "peer_add",
        user_ids: [test_user.user_id],
        stream_ids: [streams.devel.stream_id],
    },

    subscription__peer_remove: {
        type: "subscription",
        op: "peer_remove",
        user_ids: [test_user.user_id],
        stream_ids: [streams.devel.stream_id],
    },

    subscription__remove: {
        type: "subscription",
        op: "remove",
        subscriptions: [
            {
                name: "devel",
                stream_id: 42,
            },
        ],
    },

    subscription__update: {
        type: "subscription",
        op: "update",
        email: test_user.email,
        name: streams.devel.name,
        stream_id: streams.devel.stream_id,
        property: "pin_to_top",
        value: true,
    },

    typing__start: {
        type: "typing",
        op: "start",
        sender: typing_person1,
        recipients: [typing_person2],
    },

    typing__stop: {
        type: "typing",
        op: "stop",
        sender: typing_person1,
        recipients: [typing_person2],
    },

    update_display_settings__color_scheme_automatic: {
        type: "update_display_settings",
        setting_name: "color_scheme",
        setting: 1,
        user: test_user.email,
    },

    update_display_settings__color_scheme_dark: {
        type: "update_display_settings",
        setting_name: "color_scheme",
        setting: 2,
        user: test_user.email,
    },

    update_display_settings__color_scheme_light: {
        type: "update_display_settings",
        setting_name: "color_scheme",
        setting: 3,
        user: test_user.email,
    },

    update_display_settings__default_language: {
        type: "update_display_settings",
        setting_name: "default_language",
        setting: "fr",
        language_name: "French",
        user: test_user.email,
    },

    update_display_settings__demote_inactive_streams: {
        type: "update_display_settings",
        setting_name: "demote_inactive_streams",
        setting: 2,
        user: test_user.email,
    },

    update_display_settings__dense_mode: {
        type: "update_display_settings",
        setting_name: "dense_mode",
        setting: true,
        user: test_user.email,
    },

    update_display_settings__emojiset: {
        type: "update_display_settings",
        setting_name: "emojiset",
        setting: "google",
        user: test_user.email,
    },

    update_display_settings__fluid_layout_width: {
        type: "update_display_settings",
        setting_name: "fluid_layout_width",
        setting: true,
        user: test_user.email,
    },

    update_display_settings__high_contrast_mode: {
        type: "update_display_settings",
        setting_name: "high_contrast_mode",
        setting: true,
        user: test_user.email,
    },

    update_display_settings__left_side_userlist: {
        type: "update_display_settings",
        setting_name: "left_side_userlist",
        setting: true,
        user: test_user.email,
    },

    update_display_settings__starred_message_counts: {
        type: "update_display_settings",
        setting_name: "starred_message_counts",
        setting: true,
        user: test_user.email,
    },

    update_display_settings__translate_emoticons: {
        type: "update_display_settings",
        setting_name: "translate_emoticons",
        setting: true,
        user: test_user.email,
    },

    update_display_settings__twenty_four_hour_time: {
        type: "update_display_settings",
        setting_name: "twenty_four_hour_time",
        setting: true,
        user: test_user.email,
    },

    update_global_notifications: {
        type: "update_global_notifications",
        notification_name: "enable_stream_audible_notifications",
        setting: true,
        user: test_user.email,
    },

    update_message_flags__read: {
        type: "update_message_flags",
        op: "add",
        operation: "add",
        flag: "read",
        messages: [999],
        all: false,
    },

    update_message_flags__starred_add: {
        type: "update_message_flags",
        op: "add",
        operation: "add",
        flag: "starred",
        messages: [exports.test_message.id],
        all: false,
    },

    update_message_flags__starred_remove: {
        type: "update_message_flags",
        op: "remove",
        operation: "remove",
        flag: "starred",
        messages: [exports.test_message.id],
        all: false,
    },

    user_group__add: {
        type: "user_group",
        op: "add",
        group: {
            id: 555,
            name: "Mobile",
            description: "mobile folks",
            members: [1],
        },
    },

    user_group__add_members: {
        type: "user_group",
        op: "add_members",
        group_id: 1,
        user_ids: [2],
    },

    user_group__remove_members: {
        type: "user_group",
        op: "remove_members",
        group_id: 3,
        user_ids: [99, 100],
    },

    user_group__update: {
        type: "user_group",
        op: "update",
        group_id: 3,
        data: {
            name: "Frontend",
            description: "All Frontend people",
        },
    },

    user_status__revoke_away: {
        type: "user_status",
        user_id: 63,
        away: false,
    },

    user_status__set_away: {
        type: "user_status",
        user_id: 55,
        away: true,
    },

    user_status__set_status_text: {
        type: "user_status",
        user_id: test_user.user_id,
        status_text: "out to lunch",
    },
};
