"use strict";

const {strict: assert} = require("assert");

const {stub_templates} = require("../zjsunit/handlebars");
const {set_global, zrequire} = require("../zjsunit/namespace");
const {run_test} = require("../zjsunit/test");
const {make_zjquery} = require("../zjsunit/zjquery");

set_global("document", "document-stub");
set_global("$", make_zjquery());

zrequire("unread_ui");
const Filter = zrequire("Filter", "js/filter");
const stream_sort = zrequire("stream_sort");
const stream_color = zrequire("stream_color");
zrequire("hash_util");
const unread = zrequire("unread");
const stream_data = zrequire("stream_data");
const scroll_util = zrequire("scroll_util");
zrequire("list_cursor");
const stream_list = zrequire("stream_list");
zrequire("ui");
set_global("page_params", {
    is_admin: false,
    realm_users: [],
});

stream_color.initialize();

const noop = function () {};
const return_false = function () {
    return false;
};
const return_true = function () {
    return true;
};

const topic_list = set_global("topic_list", {});
set_global("overlays", {});
set_global("popovers", {});

set_global("keydown_util", {
    handle: noop,
});

run_test("create_sidebar_row", () => {
    // Make a couple calls to create_sidebar_row() and make sure they
    // generate the right markup as well as play nice with get_stream_li().
    page_params.demote_inactive_streams = 1;
    const devel = {
        name: "devel",
        stream_id: 100,
        color: "blue",
        subscribed: true,
        pin_to_top: true,
    };
    stream_data.add_sub(devel);

    const social = {
        name: "social",
        stream_id: 200,
        color: "green",
        subscribed: true,
    };
    stream_data.add_sub(social);

    unread.num_unread_for_stream = function () {
        return 42;
    };

    (function create_devel_sidebar_row() {
        const devel_value = $.create("devel-value");
        const devel_count = $.create("devel-count");

        const sidebar_row = $("<devel sidebar row>");

        sidebar_row.set_find_results(".count", devel_count);
        devel_count.set_find_results(".value", devel_value);
        devel_count.set_parent(sidebar_row);

        stub_templates((template_name, data) => {
            assert.equal(template_name, "stream_sidebar_row");
            assert.equal(data.uri, "#narrow/stream/100-devel");
            return "<devel sidebar row>";
        });

        stream_list.create_sidebar_row(devel);
        assert.equal(devel_value.text(), "42");
    })();

    (function create_social_sidebar_row() {
        const social_value = $.create("social-value");
        const social_count = $.create("social-count");
        const sidebar_row = $("<social sidebar row>");

        sidebar_row.set_find_results(".count", social_count);
        social_count.set_find_results(".value", social_value);
        social_count.set_parent(sidebar_row);

        stub_templates((template_name, data) => {
            assert.equal(template_name, "stream_sidebar_row");
            assert.equal(data.uri, "#narrow/stream/200-social");
            return "<social sidebar row>";
        });

        stream_list.create_sidebar_row(social);
        assert.equal(social_value.text(), "42");
    })();

    const split = '<hr class="stream-split">';
    const devel_sidebar = $("<devel sidebar row>");
    const social_sidebar = $("<social sidebar row>");

    let appended_elems;
    $("#stream_filters").append = function (elems) {
        appended_elems = elems;
    };

    let topic_list_cleared;
    topic_list.clear = () => {
        topic_list_cleared = true;
    };

    stream_list.build_stream_list();

    assert(topic_list_cleared);

    const expected_elems = [
        devel_sidebar, //pinned
        split, //separator
        social_sidebar, //not pinned
    ];

    assert.deepEqual(appended_elems, expected_elems);

    const social_li = $("<social sidebar row>");
    const stream_id = social.stream_id;

    social_li.length = 0;

    const privacy_elem = $.create("privacy-stub");
    social_li.set_find_results(".stream-privacy", privacy_elem);

    social.invite_only = true;
    social.color = "#222222";
    stub_templates((template_name, data) => {
        assert.equal(template_name, "stream_privacy");
        assert.equal(data.invite_only, true);
        assert.equal(data.dark_background, "dark_background");
        return "<div>privacy-html";
    });
    stream_list.redraw_stream_privacy(social);
    assert.equal(privacy_elem.html(), "<div>privacy-html");

    stream_list.set_in_home_view(stream_id, false);
    assert(social_li.hasClass("out_of_home_view"));

    stream_list.set_in_home_view(stream_id, true);
    assert(!social_li.hasClass("out_of_home_view"));

    const row = stream_list.stream_sidebar.get_row(stream_id);
    stream_data.is_active = return_true;
    row.update_whether_active();
    assert(!social_li.hasClass("inactive_stream"));

    stream_data.is_active = return_false;
    row.update_whether_active();
    assert(social_li.hasClass("inactive_stream"));

    let removed;
    social_li.remove = function () {
        removed = true;
    };

    row.remove();
    assert(removed);
});

run_test("pinned_streams_never_inactive", () => {
    // Ensure that pinned streams are never treated as dormant ie never given "inactive" class
    stream_data.clear_subscriptions();

    const devel = {
        name: "devel",
        stream_id: 100,
        color: "blue",
        subscribed: true,
        pin_to_top: true,
    };
    stream_data.add_sub(devel);

    const social = {
        name: "social",
        stream_id: 200,
        color: "green",
        subscribed: true,
    };
    stream_data.add_sub(social);

    // we use social and devel created in create_social_sidebar_row() and create_devel_sidebar_row()

    // non-pinned streams can be made inactive
    const social_sidebar = $("<social sidebar row>");
    let stream_id = social.stream_id;
    let row = stream_list.stream_sidebar.get_row(stream_id);
    stream_data.is_active = return_false;

    stream_list.build_stream_list();
    assert(social_sidebar.hasClass("inactive_stream"));

    stream_data.is_active = return_true;
    row.update_whether_active();
    assert(!social_sidebar.hasClass("inactive_stream"));

    stream_data.is_active = return_false;
    row.update_whether_active();
    assert(social_sidebar.hasClass("inactive_stream"));

    // pinned streams can never be made inactive
    const devel_sidebar = $("<devel sidebar row>");
    stream_id = devel.stream_id;
    row = stream_list.stream_sidebar.get_row(stream_id);
    stream_data.is_active = return_false;

    stream_list.build_stream_list();
    assert(!devel_sidebar.hasClass("inactive_stream"));

    row.update_whether_active();
    assert(!devel_sidebar.hasClass("inactive_stream"));
});

set_global("$", make_zjquery());

function add_row(sub) {
    stream_data.add_sub(sub);
    const row = {
        update_whether_active() {},
        get_li() {
            const html = "<" + sub.name + " sidebar row html>";
            const obj = $(html);

            obj.length = 1; // bypass blueslip error

            return obj;
        },
    };
    stream_list.stream_sidebar.set_row(sub.stream_id, row);
}

function initialize_stream_data() {
    stream_data.clear_subscriptions();

    // pinned streams
    const develSub = {
        name: "devel",
        stream_id: 1000,
        color: "blue",
        pin_to_top: true,
        subscribed: true,
    };
    add_row(develSub);

    const RomeSub = {
        name: "Rome",
        stream_id: 2000,
        color: "blue",
        pin_to_top: true,
        subscribed: true,
    };
    add_row(RomeSub);

    const testSub = {
        name: "test",
        stream_id: 3000,
        color: "blue",
        pin_to_top: true,
        subscribed: true,
    };
    add_row(testSub);

    // unpinned streams
    const announceSub = {
        name: "announce",
        stream_id: 4000,
        color: "green",
        pin_to_top: false,
        subscribed: true,
    };
    add_row(announceSub);

    const DenmarkSub = {
        name: "Denmark",
        stream_id: 5000,
        color: "green",
        pin_to_top: false,
        subscribed: true,
    };
    add_row(DenmarkSub);

    const carSub = {
        name: "cars",
        stream_id: 6000,
        color: "green",
        pin_to_top: false,
        subscribed: true,
    };
    add_row(carSub);
}

function elem($obj) {
    return {to_$: () => $obj};
}

run_test("zoom_in_and_zoom_out", () => {
    const label1 = $.create("label1 stub");
    const label2 = $.create("label2 stub");

    label1.show();
    label2.show();

    assert(label1.visible());
    assert(label2.visible());

    $.create(".stream-filters-label", {
        children: [elem(label1), elem(label2)],
    });

    const splitter = $.create("hr stub");

    splitter.show();
    assert(splitter.visible());

    $.create(".stream-split", {
        children: [elem(splitter)],
    });

    const stream_li1 = $.create("stream1 stub");
    const stream_li2 = $.create("stream2 stub");

    function make_attr(arg) {
        return (sel) => {
            assert.equal(sel, "data-stream-id");
            return arg;
        };
    }

    stream_li1.attr = make_attr("42");
    stream_li1.hide();
    stream_li2.attr = make_attr("99");

    $.create("#stream_filters li.narrow-filter", {
        children: [elem(stream_li1), elem(stream_li2)],
    });

    $("#stream-filters-container")[0] = {
        dataset: {},
    };
    stream_list.set_event_handlers();

    stream_list.zoom_in_topics({stream_id: 42});

    assert(!label1.visible());
    assert(!label2.visible());
    assert(!splitter.visible());
    assert(stream_li1.visible());
    assert(!stream_li2.visible());
    assert($("#streams_list").hasClass("zoom-in"));

    $("#stream_filters li.narrow-filter").show = () => {
        stream_li1.show();
        stream_li2.show();
    };

    stream_li1.length = 1;
    stream_list.zoom_out_topics({stream_li: stream_li1});

    assert(label1.visible());
    assert(label2.visible());
    assert(splitter.visible());
    assert(stream_li1.visible());
    assert(stream_li2.visible());
    assert($("#streams_list").hasClass("zoom-out"));
});

set_global("$", make_zjquery());

let narrow_state;
run_test("narrowing", () => {
    initialize_stream_data();

    narrow_state = set_global("narrow_state", {
        stream() {
            return "devel";
        },
        topic: noop,
    });

    topic_list.close = noop;
    topic_list.rebuild = noop;
    topic_list.active_stream_id = noop;
    topic_list.get_stream_li = noop;
    scroll_util.scroll_element_into_container = noop;

    set_global("ui", {
        get_scroll_element: (element) => element,
    });

    assert(!$("<devel sidebar row html>").hasClass("active-filter"));

    stream_list.set_event_handlers();

    let filter;

    filter = new Filter([{operator: "stream", operand: "devel"}]);
    stream_list.handle_narrow_activated(filter);
    assert($("<devel sidebar row html>").hasClass("active-filter"));

    filter = new Filter([
        {operator: "stream", operand: "cars"},
        {operator: "topic", operand: "sedans"},
    ]);
    stream_list.handle_narrow_activated(filter);
    assert(!$("ul.filters li").hasClass("active-filter"));
    assert(!$("<cars sidebar row html>").hasClass("active-filter")); // false because of topic

    filter = new Filter([{operator: "stream", operand: "cars"}]);
    stream_list.handle_narrow_activated(filter);
    assert(!$("ul.filters li").hasClass("active-filter"));
    assert($("<cars sidebar row html>").hasClass("active-filter"));

    let removed_classes;
    $("ul#stream_filters li").removeClass = (classes) => {
        removed_classes = classes;
    };

    let topics_closed;
    topic_list.close = () => {
        topics_closed = true;
    };

    stream_list.handle_narrow_deactivated();
    assert.equal(removed_classes, "active-filter");
    assert(topics_closed);
});

run_test("focusout_user_filter", () => {
    const e = {};
    const click_handler = $(".stream-list-filter").get_on_handler("focusout");
    click_handler(e);
});

run_test("focus_user_filter", () => {
    const e = {
        stopPropagation() {},
    };
    const click_handler = $(".stream-list-filter").get_on_handler("click");
    click_handler(e);
});

run_test("sort_streams", () => {
    stream_data.clear_subscriptions();

    // Get coverage on early-exit.
    stream_list.build_stream_list();

    initialize_stream_data();

    stream_data.is_active = function (sub) {
        return sub.name !== "cars";
    };

    let appended_elems;
    $("#stream_filters").append = function (elems) {
        appended_elems = elems;
    };

    stream_list.build_stream_list();

    const split = '<hr class="stream-split">';
    const expected_elems = [
        $("<devel sidebar row html>"),
        $("<Rome sidebar row html>"),
        $("<test sidebar row html>"),
        split,
        $("<announce sidebar row html>"),
        $("<Denmark sidebar row html>"),
        split,
        $("<cars sidebar row html>"),
    ];

    assert.deepEqual(appended_elems, expected_elems);

    const streams = stream_sort.get_streams();

    assert.deepEqual(streams, [
        // three groups: pinned, normal, dormant
        "devel",
        "Rome",
        "test",
        //
        "announce",
        "Denmark",
        //
        "cars",
    ]);

    const denmark_sub = stream_data.get_sub("Denmark");
    const stream_id = denmark_sub.stream_id;
    assert(stream_list.stream_sidebar.has_row_for(stream_id));
    stream_list.remove_sidebar_row(stream_id);
    assert(!stream_list.stream_sidebar.has_row_for(stream_id));
});

run_test("separators_only_pinned_and_dormant", () => {
    // Test only pinned and dormant streams

    stream_data.clear_subscriptions();

    // Get coverage on early-exit.
    stream_list.build_stream_list();

    // pinned streams
    const develSub = {
        name: "devel",
        stream_id: 1000,
        color: "blue",
        pin_to_top: true,
        subscribed: true,
    };
    add_row(develSub);

    const RomeSub = {
        name: "Rome",
        stream_id: 2000,
        color: "blue",
        pin_to_top: true,
        subscribed: true,
    };
    add_row(RomeSub);
    // dormant stream
    const DenmarkSub = {
        name: "Denmark",
        stream_id: 3000,
        color: "blue",
        pin_to_top: false,
        subscribed: true,
    };
    add_row(DenmarkSub);

    stream_data.is_active = function (sub) {
        return sub.name !== "Denmark";
    };

    let appended_elems;
    $("#stream_filters").append = function (elems) {
        appended_elems = elems;
    };

    stream_list.build_stream_list();

    const split = '<hr class="stream-split">';
    const expected_elems = [
        // pinned
        $("<devel sidebar row html>"),
        $("<Rome sidebar row html>"),
        split,
        // dormant
        $("<Denmark sidebar row html>"),
    ];

    assert.deepEqual(appended_elems, expected_elems);
});

run_test("separators_only_pinned", () => {
    // Test only pinned streams

    stream_data.clear_subscriptions();

    // Get coverage on early-exit.
    stream_list.build_stream_list();

    // pinned streams
    const develSub = {
        name: "devel",
        stream_id: 1000,
        color: "blue",
        pin_to_top: true,
        subscribed: true,
    };
    add_row(develSub);

    const RomeSub = {
        name: "Rome",
        stream_id: 2000,
        color: "blue",
        pin_to_top: true,
        subscribed: true,
    };
    add_row(RomeSub);

    let appended_elems;
    $("#stream_filters").append = function (elems) {
        appended_elems = elems;
    };

    stream_list.build_stream_list();

    const expected_elems = [
        // pinned
        $("<devel sidebar row html>"),
        $("<Rome sidebar row html>"),
        // no separator at the end as no stream follows
    ];

    assert.deepEqual(appended_elems, expected_elems);
});

run_test("update_count_in_dom", () => {
    function make_elem(elem, count_selector, value_selector) {
        const count = $(count_selector);
        const value = $(value_selector);
        elem.set_find_results(".count", count);
        count.set_find_results(".value", value);
        count.set_parent(elem);

        return elem;
    }

    const stream_li = make_elem($("<stream li>"), "<stream-count>", "<stream-value>");

    $("<stream li>").length = 0;
    stream_li.addClass("subscription_block");
    stream_li.addClass("stream-with-count");
    assert(stream_li.hasClass("stream-with-count"));

    const stream_count = new Map();
    const stream_id = 11;

    const stream_row = {
        get_li() {
            return stream_li;
        },
    };

    stream_list.stream_sidebar.set_row(stream_id, stream_row);

    stream_count.set(stream_id, 0);
    const counts = {
        stream_count,
        topic_count: new Map(),
    };

    stream_list.update_dom_with_unread_counts(counts);
    assert.equal($("<stream li>").text(), "never-been-set");
    assert(!stream_li.hasClass("stream-with-count"));

    stream_count.set(stream_id, 99);

    stream_list.update_dom_with_unread_counts(counts);
    assert.equal($("<stream-value>").text(), "99");
    assert(stream_li.hasClass("stream-with-count"));
});

narrow_state.active = () => false;

run_test("rename_stream", () => {
    const sub = stream_data.get_sub_by_name("devel");
    const new_name = "Development";

    stream_data.rename_sub(sub, new_name);

    const li_stub = $.create("li stub");
    li_stub.length = 0;

    stub_templates((name, payload) => {
        assert.equal(name, "stream_sidebar_row");
        assert.deepEqual(payload, {
            name: "Development",
            id: 1000,
            uri: "#narrow/stream/1000-Development",
            is_muted: false,
            invite_only: undefined,
            is_web_public: undefined,
            color: payload.color,
            pin_to_top: true,
            dark_background: payload.dark_background,
        });
        return {to_$: () => li_stub};
    });

    let count_updated;
    stream_list.update_count_in_dom = (li) => {
        assert.equal(li, li_stub);
        count_updated = true;
    };

    stream_list.rename_stream(sub);
    assert(count_updated);
});

set_global("$", make_zjquery());

run_test("refresh_pin", () => {
    initialize_stream_data();

    const sub = {
        name: "maybe_pin",
        stream_id: 100,
        color: "blue",
        pin_to_top: false,
    };

    stream_data.add_sub(sub);

    const pinned_sub = {
        ...sub,
        pin_to_top: true,
    };

    const li_stub = $.create("li stub");
    li_stub.length = 0;

    stub_templates(() => ({to_$: () => li_stub}));

    stream_list.update_count_in_dom = noop;
    $("#stream_filters").append = noop;

    let scrolled;
    stream_list.scroll_stream_into_view = (li) => {
        assert.equal(li, li_stub);
        scrolled = true;
    };

    stream_list.refresh_pinned_or_unpinned_stream(pinned_sub);
    assert(scrolled);
});

run_test("create_initial_sidebar_rows", () => {
    initialize_stream_data();

    const html_dict = new Map();

    stream_list.stream_sidebar = {
        has_row_for: return_false,
        set_row(stream_id, widget) {
            html_dict.set(stream_id, widget.get_li().html());
        },
    };

    stream_list.update_count_in_dom = noop;

    stub_templates((template_name, data) => {
        assert.equal(template_name, "stream_sidebar_row");
        return "<div>stub-html-" + data.name;
    });

    // Test this code with stubs above...
    stream_list.create_initial_sidebar_rows();

    assert.equal(html_dict.get(1000), "<div>stub-html-devel");
    assert.equal(html_dict.get(5000), "<div>stub-html-Denmark");
});
