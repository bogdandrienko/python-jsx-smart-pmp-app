"use strict";

const {strict: assert} = require("assert");

const {set_global, zrequire} = require("../zjsunit/namespace");
const {run_test} = require("../zjsunit/test");
const {make_zjquery} = require("../zjsunit/zjquery");

set_global("$", make_zjquery());
const poll_widget = set_global("poll_widget", {});
set_global("document", "document-stub");

const return_true = () => true;
const return_false = () => false;

const widgetize = zrequire("widgetize");

const narrow_state = set_global("narrow_state", {});
set_global("current_msg_list", {});

run_test("activate", () => {
    // Both widgetize.activate and widgetize.handle_event are tested
    // here to use the "caching" of widgets
    const row = $.create("<stub message row>");
    row.attr("id", "zhome2909");
    const message_content = $.create("#zhome2909");
    row.set_find_results(".message_content", message_content);

    const events = [
        {
            data: {
                option: "First option",
                idx: 1,
                type: "new_option",
            },
            sender_id: 101,
        },
        {
            data: {
                option: "Second option",
                idx: 1,
                type: "new_option",
            },
            sender_id: 102,
        },
        {
            data: {
                option: "Third option",
                idx: 1,
                type: "new_option",
            },
            sender_id: 102,
        },
    ];

    const opts = {
        events: events.slice(),
        extra_data: "",
        message: {
            id: 2001,
        },
        post_to_server: (data) => {
            assert.equal(data.msg_type, "widget");
            assert.equal(data.data, "test_data");
        },
        row,
        widget_type: "poll",
    };

    narrow_state.active = return_false;

    let widget_elem;
    let is_event_handled;
    let is_widget_activated;
    let is_widget_elem_inserted;

    poll_widget.activate = (data) => {
        is_widget_activated = true;
        widget_elem = data.elem;
        assert(widget_elem.hasClass("widget-content"));
        widget_elem.handle_events = (e) => {
            is_event_handled = true;
            assert.notDeepStrictEqual(e, events);
            events.shift();
            assert.deepStrictEqual(e, events);
        };
        data.callback("test_data");
    };

    message_content.append = (elem) => {
        is_widget_elem_inserted = true;
        assert.equal(elem, widget_elem);
        assert(elem.hasClass("widget-content"));
    };

    is_widget_elem_inserted = false;
    is_widget_activated = false;
    is_event_handled = false;
    assert(!widgetize.widget_contents.has(opts.message.id));

    widgetize.activate(opts);

    assert(is_widget_elem_inserted);
    assert(is_widget_activated);
    assert(is_event_handled);
    assert.equal(widgetize.widget_contents.get(opts.message.id), widget_elem);

    is_widget_elem_inserted = false;
    is_widget_activated = false;
    is_event_handled = false;

    widgetize.activate(opts);

    assert(is_widget_elem_inserted);
    assert(!is_widget_activated);
    assert(!is_event_handled);

    narrow_state.active = return_true;
    is_widget_elem_inserted = false;
    is_widget_activated = false;
    is_event_handled = false;

    widgetize.activate(opts);

    assert(!is_widget_elem_inserted);
    assert(!is_widget_activated);
    assert(!is_event_handled);

    blueslip.expect("warn", "unknown widget_type");
    narrow_state.active = return_false;
    is_widget_elem_inserted = false;
    is_widget_activated = false;
    is_event_handled = false;
    opts.widget_type = "invalid_widget";

    widgetize.activate(opts);
    assert(!is_widget_elem_inserted);
    assert(!is_widget_activated);
    assert(!is_event_handled);
    assert.equal(blueslip.get_test_logs("warn")[0].more_info, "invalid_widget");

    opts.widget_type = "tictactoe";

    widgetize.activate(opts);
    assert(!is_widget_elem_inserted);
    assert(!is_widget_activated);
    assert(!is_event_handled);

    /* Testing widgetize.handle_events */
    const post_activate_event = {
        data: {
            idx: 1,
            type: "new_option",
        },
        message_id: 2001,
        sender_id: 102,
    };
    widget_elem.handle_events = (e) => {
        is_event_handled = true;
        assert.deepEqual(e, [post_activate_event]);
    };
    is_event_handled = false;
    widgetize.handle_event(post_activate_event);
    assert(is_event_handled);

    is_event_handled = false;
    post_activate_event.message_id = 1000;
    widgetize.handle_event(post_activate_event);
    assert(!is_event_handled);

    /* Test narrow change message update */
    current_msg_list.get = (idx) => {
        assert.equal(idx, 2001);
        return {};
    };
    current_msg_list.get_row = (idx) => {
        assert.equal(idx, 2001);
        return row;
    };
    widgetize.set_widgets_for_list();
});
