/*
    This file contains translations between the integer values used in
    the Zulip API to describe values in dropdowns, radio buttons, and
    similar widgets and the user-facing strings that should be used to
    describe them, as well as data details like sort orders that may
    be useful for some widgets.

    We plan to eventually transition much of this file to have a more
    standard format and then to be populated using data sent from the
    Zulip server in `page_params`, so that the data is available for
    other parts of the ecosystem to use (including the mobile apps and
    API documentation) without a ton of copying.
*/

export const demote_inactive_streams_values = {
    automatic: {
        code: 1,
        description: i18n.t("Automatic"),
    },
    always: {
        code: 2,
        description: i18n.t("Always"),
    },
    never: {
        code: 3,
        description: i18n.t("Never"),
    },
};

export const color_scheme_values = {
    automatic: {
        code: 1,
        description: i18n.t("Automatic"),
    },
    night: {
        code: 2,
        description: i18n.t("Night mode"),
    },
    day: {
        code: 3,
        description: i18n.t("Day mode"),
    },
};

export const twenty_four_hour_time_values = {
    twenty_four_hour_clock: {
        value: true,
        description: i18n.t("24-hour clock (17:00)"),
    },
    twelve_hour_clock: {
        value: false,
        description: i18n.t("12-hour clock (5:00 PM)"),
    },
};

export const get_all_display_settings = () => ({
    settings: {
        user_display_settings: [
            "dense_mode",
            "high_contrast_mode",
            "left_side_userlist",
            "starred_message_counts",
            "fluid_layout_width",
        ],
    },
    render_only: {
        high_contrast_mode: page_params.development_environment,
        dense_mode: page_params.development_environment,
    },
});

export const email_address_visibility_values = {
    everyone: {
        code: 1,
        description: i18n.t("Admins, members, and guests"),
    },
    //// Backend support for this configuration is not available yet.
    // admins_and_members: {
    //     code: 2,
    //     description: i18n.t("Members and admins"),
    // },
    admins_only: {
        code: 3,
        description: i18n.t("Admins only"),
    },
    nobody: {
        code: 4,
        description: i18n.t("Nobody"),
    },
};

export const create_stream_policy_values = {
    by_admins_only: {
        order: 1,
        code: 2,
        description: i18n.t("Admins"),
    },
    by_full_members: {
        order: 2,
        code: 3,
        description: i18n.t("Admins and full members"),
    },
    by_members: {
        order: 3,
        code: 1,
        description: i18n.t("Admins and members"),
    },
};

export const invite_to_stream_policy_values = create_stream_policy_values;

export const user_group_edit_policy_values = {
    by_admins_only: {
        order: 1,
        code: 2,
        description: i18n.t("Admins"),
    },
    by_members: {
        order: 2,
        code: 1,
        description: i18n.t("Admins and members"),
    },
};

export const private_message_policy_values = {
    by_anyone: {
        order: 1,
        code: 1,
        description: i18n.t("Admins, members, and guests"),
    },
    disabled: {
        order: 2,
        code: 2,
        description: i18n.t("Private messages disabled"),
    },
};

export const wildcard_mention_policy_values = {
    by_everyone: {
        order: 1,
        code: 1,
        description: i18n.t("Admins, members and guests"),
    },
    by_members: {
        order: 2,
        code: 2,
        description: i18n.t("Admins and members"),
    },
    by_full_members: {
        order: 3,
        code: 3,
        description: i18n.t("Admins and full members"),
    },
    // Until we add stream administrators, we mislabel this choice
    // (which we intend to be the long-term default) as "Admins only"
    // and don't offer the long-term "Admins only" option.
    by_stream_admins_only: {
        order: 4,
        code: 4,
        //  description: i18n.t("Organization and stream admins"),
        description: i18n.t("Admins only"),
    },
    // by_admins_only: {
    //     order: 5,
    //     code: 5,
    //     description: i18n.t("Admins only"),
    // },
    nobody: {
        order: 6,
        code: 6,
        description: i18n.t("Nobody"),
    },
};

const time_limit_dropdown_values = new Map([
    [
        "any_time",
        {
            text: i18n.t("Any time"),
            seconds: 0,
        },
    ],
    [
        "never",
        {
            text: i18n.t("Never"),
        },
    ],
    [
        "upto_two_min",
        {
            text: i18n.t("Up to __time_limit__ after posting", {time_limit: i18n.t("2 minutes")}),
            seconds: 2 * 60,
        },
    ],
    [
        "upto_ten_min",
        {
            text: i18n.t("Up to __time_limit__ after posting", {time_limit: i18n.t("10 minutes")}),
            seconds: 10 * 60,
        },
    ],
    [
        "upto_one_hour",
        {
            text: i18n.t("Up to __time_limit__ after posting", {time_limit: i18n.t("1 hour")}),
            seconds: 60 * 60,
        },
    ],
    [
        "upto_one_day",
        {
            text: i18n.t("Up to __time_limit__ after posting", {time_limit: i18n.t("1 day")}),
            seconds: 24 * 60 * 60,
        },
    ],
    [
        "upto_one_week",
        {
            text: i18n.t("Up to __time_limit__ after posting", {time_limit: i18n.t("1 week")}),
            seconds: 7 * 24 * 60 * 60,
        },
    ],
    [
        "custom_limit",
        {
            text: i18n.t("Up to N minutes after posting"),
        },
    ],
]);
export const msg_edit_limit_dropdown_values = time_limit_dropdown_values;
export const msg_delete_limit_dropdown_values = time_limit_dropdown_values;
export const retain_message_forever = -1;

export const user_role_values = {
    guest: {
        code: 600,
        description: i18n.t("Guest"),
    },
    member: {
        code: 400,
        description: i18n.t("Member"),
    },
    admin: {
        code: 200,
        description: i18n.t("Administrator"),
    },
    owner: {
        code: 100,
        description: i18n.t("Owner"),
    },
};

const user_role_array = Object.values(user_role_values);
export const user_role_map = new Map(user_role_array.map((role) => [role.code, role.description]));

// NOTIFICATIONS

export const general_notifications_table_labels = {
    realm: [
        /* An array of notification settings of any category like
         * `stream_notification_settings` which makes a single row of
         * "Notification triggers" table should follow this order
         */
        "visual",
        "audio",
        "mobile",
        "email",
        "all_mentions",
    ],
    stream: {
        is_muted: i18n.t("Mute stream"),
        desktop_notifications: i18n.t("Visual desktop notifications"),
        audible_notifications: i18n.t("Audible desktop notifications"),
        push_notifications: i18n.t("Mobile notifications"),
        email_notifications: i18n.t("Email notifications"),
        pin_to_top: i18n.t("Pin stream to top of left sidebar"),
        wildcard_mentions_notify: i18n.t("Notifications for @all/@everyone mentions"),
    },
};

export const stream_specific_notification_settings = [
    "desktop_notifications",
    "audible_notifications",
    "push_notifications",
    "email_notifications",
    "wildcard_mentions_notify",
];

export const stream_notification_settings = [
    "enable_stream_desktop_notifications",
    "enable_stream_audible_notifications",
    "enable_stream_push_notifications",
    "enable_stream_email_notifications",
    "wildcard_mentions_notify",
];

const pm_mention_notification_settings = [
    "enable_desktop_notifications",
    "enable_sounds",
    "enable_offline_push_notifications",
    "enable_offline_email_notifications",
];

const desktop_notification_settings = ["pm_content_in_desktop_notifications"];

const mobile_notification_settings = ["enable_online_push_notifications"];

const email_notification_settings = [
    "enable_digest_emails",
    "enable_login_emails",
    "message_content_in_email_notifications",
    "realm_name_in_notifications",
];

const presence_notification_settings = ["presence_enabled"];

const other_notification_settings = desktop_notification_settings.concat(
    ["desktop_icon_count_display"],
    mobile_notification_settings,
    email_notification_settings,
    presence_notification_settings,
    ["notification_sound"],
);

export const all_notification_settings = other_notification_settings.concat(
    pm_mention_notification_settings,
    stream_notification_settings,
);

export const all_notifications = () => ({
    general_settings: [
        {
            label: i18n.t("Streams"),
            notification_settings: settings_notifications.get_notifications_table_row_data(
                stream_notification_settings,
            ),
        },
        {
            label: i18n.t("PMs, mentions, and alerts"),
            notification_settings: settings_notifications.get_notifications_table_row_data(
                pm_mention_notification_settings,
            ),
        },
    ],
    settings: {
        desktop_notification_settings,
        mobile_notification_settings,
        email_notification_settings,
        presence_notification_settings,
    },
    show_push_notifications_tooltip: {
        push_notifications: !page_params.realm_push_notifications_enabled,
        enable_online_push_notifications: !page_params.realm_push_notifications_enabled,
    },
});

const map_language_to_playground_info = {
    // TODO: This is being hardcoded just for the prototype, post which we should
    // add support for realm admins to configure their own choices. The keys here
    // are the pygment lexer subclass names for the different language alias it
    // supports.
    Rust: [
        {
            name: "Rust playground",
            url_prefix: "https://play.rust-lang.org/?edition=2018&code=",
        },
    ],
    Julia: [
        {
            name: "Julia playground",
            url_prefix: "https://repl.it/languages/julia/?code=",
        },
    ],
    Python: [
        {
            name: "Python 3 playground",
            url_prefix: "https://repl.it/languages/python3/?code=",
        },
    ],
    "Python 2.7": [
        {
            name: "Python 2.7 playground",
            url_prefix: "https://repl.it/languages/python/?code=",
        },
    ],
    JavaScript: [
        {
            name: "JavaScript playground",
            url_prefix: "https://repl.it/languages/javascript/?code=",
        },
    ],
    Lean: [
        {
            name: "Lean playground",
            url_prefix: "https://leanprover.github.io/live/latest/#code=",
        },
        {
            name: "Lean community playground",
            url_prefix: "https://leanprover-community.github.io/lean-web-editor/#code=",
        },
    ],
};

export const get_playground_info_for_languages = (lang) => map_language_to_playground_info[lang];
