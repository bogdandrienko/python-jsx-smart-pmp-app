"use strict";

const rewiremock = require("rewiremock/node");

const {stub_templates} = require("../zjsunit/handlebars");
const {set_global, zrequire} = require("../zjsunit/namespace");
const {run_test} = require("../zjsunit/test");
const {make_zjquery} = require("../zjsunit/zjquery");

/*
    This test suite is designed to find errors
    in our initialization sequence.  It doesn't
    really validate any behavior, other than just
    making sure things don't fail.  For more
    directed testing of individual modules, you
    should create dedicated test suites.

    Also, we stub a lot of initialization here that
    is tricky to test due to dependencies on things
    like jQuery.  A good project is to work through
    ignore_modules and try to make this test more
    complete.

    Also, it's good to be alert here for things
    that can be cleaned up in the code--for example,
    not everything needs to happen in `initialization`--
    some things can happen later in a `launch` method.

*/
const util = zrequire("util");

set_global("document", {
    location: {
        protocol: "http",
    },
});

set_global("csrf_token", "whatever");

set_global("$", () => {});
const resize = set_global("resize", {});
set_global("page_params", {});

const ignore_modules = [
    "activity",
    "click_handlers",
    "compose_pm_pill",
    "drafts",
    "emoji_picker",
    "gear_menu",
    "hashchange",
    "hotspots",
    // Accesses home_msg_list, which is a lot of complexity to setup
    "message_fetch",
    "message_scroll",
    "message_viewport",
    "panels",
    "popovers",
    "reload",
    "scroll_bar",
    "server_events",
    "settings_sections",
    "settings_panel_menu",
    "settings_toggle",
    "subs",
    "timerender",
    "ui",
    "unread_ui",
];

const {server_events, ui} = Object.fromEntries(
    ignore_modules.map((mod) => [
        mod,
        set_global(mod, {
            initialize: () => {},
        }),
    ]),
);

util.is_mobile = () => false;
stub_templates(() => "some-html");
ui.get_scroll_element = (element) => element;

zrequire("hash_util");
zrequire("stream_color");
zrequire("stream_edit");
zrequire("color_data");
zrequire("stream_data");
zrequire("muting");
zrequire("condense");
zrequire("lightbox");
zrequire("overlays");
zrequire("message_view_header");
zrequire("narrow_state");
zrequire("presence");
zrequire("search_pill_widget");
zrequire("user_groups");
zrequire("unread");
zrequire("bot_data");
zrequire("markdown");
const upload = zrequire("upload");
const compose = zrequire("compose");
zrequire("composebox_typeahead");
zrequire("narrow");
zrequire("search_suggestion");
zrequire("search");
rewiremock.proxy(() => zrequire("notifications"), {
    "../../static/js/favicon": {},
});
zrequire("pm_list");
zrequire("list_cursor");
zrequire("keydown_util");
zrequire("stream_list");
zrequire("topic_list");
zrequire("sent_messages");
zrequire("top_left_corner");
zrequire("starred_messages");

const ui_init = rewiremock.proxy(() => zrequire("ui_init"), {
    "../../static/js/emojisets": {
        initialize: () => {},
    },
});

set_global("$", make_zjquery());

const document_stub = $.create("document-stub");
document.to_$ = () => document_stub;
document_stub.idle = () => {};

const window_stub = $.create("window-stub");
set_global("to_$", () => window_stub);
window_stub.idle = () => {};

ui_init.initialize_kitchen_sink_stuff = () => {};

page_params.realm_default_streams = [];
page_params.subscriptions = [];
page_params.unsubscribed = [];
page_params.never_subscribed = [];
page_params.realm_notifications_stream_id = -1;
page_params.unread_msgs = {
    huddles: [],
    pms: [],
    streams: [],
    mentions: [],
};
page_params.recent_private_conversations = [];
page_params.user_status = {};
page_params.realm_emoji = {};
page_params.realm_users = [];
page_params.realm_non_active_users = [];
page_params.cross_realm_bots = [];
page_params.muted_topics = [];
page_params.realm_user_groups = [];
page_params.realm_bots = [];
page_params.realm_filters = [];
page_params.starred_messages = [];
page_params.presences = [];

const $message_view_header = $.create("#message_view_header");
$message_view_header.append = () => {};
upload.setup_upload = () => {};

server_events.home_view_loaded = () => true;

resize.watch_manual_resize = () => {};

$("#stream_message_recipient_stream").typeahead = () => {};
$("#stream_message_recipient_topic").typeahead = () => {};
$("#private_message_recipient").typeahead = () => {};
$("#compose-textarea").typeahead = () => {};
$("#search_query").typeahead = () => {};

const value_stub = $.create("value");
const count_stub = $.create("count");
count_stub.set_find_results(".value", value_stub);
$(".top_left_starred_messages").set_find_results(".count", count_stub);

$("#message_view_header .stream").length = 0;

// set find results doesn't work here since we call .empty() in the code.
$message_view_header.find = () => false;

compose.compute_show_video_chat_button = () => {};
$("#below-compose-content .video_link").toggle = () => {};

run_test("initialize_everything", () => {
    ui_init.initialize_everything();
});
