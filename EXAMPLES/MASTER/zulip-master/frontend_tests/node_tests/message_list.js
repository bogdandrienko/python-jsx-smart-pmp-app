"use strict";

const {strict: assert} = require("assert");

const {set_global, stub_out_jquery, zrequire} = require("../zjsunit/namespace");
const {with_stub} = require("../zjsunit/stub");
const {run_test} = require("../zjsunit/test");
// These unit tests for static/js/message_list.js emphasize the model-ish
// aspects of the MessageList class.  We have to stub out a few functions
// related to views and events to get the tests working.

const noop = function () {};

set_global("Filter", noop);
stub_out_jquery();
set_global("document", null);
set_global("narrow_state", {});
set_global("stream_data", {});

zrequire("FetchStatus", "js/fetch_status");
const muting = zrequire("muting");
zrequire("MessageListData", "js/message_list_data");
zrequire("MessageListView", "js/message_list_view");
const {MessageList} = zrequire("message_list");

function accept_all_filter() {
    const filter = {
        predicate: () => () => true,
    };

    return filter;
}

run_test("basics", () => {
    const filter = accept_all_filter();

    const list = new MessageList({
        filter,
    });

    const messages = [
        {
            id: 50,
            content: "fifty",
        },
        {
            id: 60,
        },
        {
            id: 70,
        },
        {
            id: 80,
        },
    ];

    assert.equal(list.empty(), true);

    list.append(messages, true);

    assert.equal(list.num_items(), 4);
    assert.equal(list.empty(), false);
    assert.equal(list.first().id, 50);
    assert.equal(list.last().id, 80);

    assert.equal(list.get(50).content, "fifty");

    assert.equal(list.closest_id(49), 50);
    assert.equal(list.closest_id(50), 50);
    assert.equal(list.closest_id(51), 50);
    assert.equal(list.closest_id(59), 60);
    assert.equal(list.closest_id(60), 60);
    assert.equal(list.closest_id(61), 60);

    assert.deepEqual(list.all_messages(), messages);

    $.Event = function (ev) {
        assert.equal(ev, "message_selected.zulip");
    };
    list.select_id(50);

    assert.equal(list.selected_id(), 50);
    assert.equal(list.selected_idx(), 0);

    list.advance_past_messages([60, 80]);
    assert.equal(list.selected_id(), 60);
    assert.equal(list.selected_idx(), 1);

    // Make sure not rerendered when reselected
    let num_renders = 0;
    list.rerender = function () {
        num_renders += 1;
    };
    list.reselect_selected_id();
    assert.equal(num_renders, 0);
    assert.equal(list.selected_id(), 60);

    const old_messages = [
        {
            id: 30,
        },
        {
            id: 40,
        },
    ];
    list.add_messages(old_messages);
    assert.equal(list.first().id, 30);
    assert.equal(list.last().id, 80);

    const new_messages = [
        {
            id: 90,
        },
    ];
    list.append(new_messages, true);
    assert.equal(list.last().id, 90);

    list.view.clear_table = function () {};

    list.remove_and_rerender([60]);
    const removed = list.all_messages().filter((msg) => msg.id !== 60);
    assert.deepEqual(list.all_messages(), removed);

    list.clear();
    assert.deepEqual(list.all_messages(), []);
});

run_test("prev_next", () => {
    const list = new MessageList({});

    assert.equal(list.prev(), undefined);
    assert.equal(list.next(), undefined);
    assert.equal(list.is_at_end(), false);

    // try to confuse things with bogus selected id
    list.data.set_selected_id(33);
    assert.equal(list.prev(), undefined);
    assert.equal(list.next(), undefined);
    assert.equal(list.is_at_end(), false);

    const messages = [{id: 30}, {id: 40}, {id: 50}, {id: 60}];
    list.append(messages, true);
    assert.equal(list.prev(), undefined);
    assert.equal(list.next(), undefined);

    // The next case is for defensive code.
    list.data.set_selected_id(45);
    assert.equal(list.prev(), undefined);
    assert.equal(list.next(), undefined);
    assert.equal(list.is_at_end(), false);

    list.data.set_selected_id(30);
    assert.equal(list.prev(), undefined);
    assert.equal(list.next(), 40);

    list.data.set_selected_id(50);
    assert.equal(list.prev(), 40);
    assert.equal(list.next(), 60);
    assert.equal(list.is_at_end(), false);

    list.data.set_selected_id(60);
    assert.equal(list.prev(), 50);
    assert.equal(list.next(), undefined);
    assert.equal(list.is_at_end(), true);
});

run_test("message_range", () => {
    const list = new MessageList({});

    const messages = [{id: 30}, {id: 40}, {id: 50}, {id: 60}];
    list.append(messages, true);
    assert.deepEqual(list.message_range(2, 30), [{id: 30}]);
    assert.deepEqual(list.message_range(2, 31), [{id: 30}, {id: 40}]);
    assert.deepEqual(list.message_range(30, 40), [{id: 30}, {id: 40}]);
    assert.deepEqual(list.message_range(31, 39), [{id: 40}]);
    assert.deepEqual(list.message_range(31, 1000), [{id: 40}, {id: 50}, {id: 60}]);
    blueslip.expect("error", "message_range given a start of -1");
    assert.deepEqual(list.message_range(-1, 40), [{id: 30}, {id: 40}]);
});

run_test("nth_most_recent_id", () => {
    const list = new MessageList({});
    list.append([{id: 10}, {id: 20}, {id: 30}]);
    assert.equal(list.nth_most_recent_id(1), 30);
    assert.equal(list.nth_most_recent_id(2), 20);
    assert.equal(list.nth_most_recent_id(3), 10);
    assert.equal(list.nth_most_recent_id(4), -1);
});

run_test("change_message_id", () => {
    const list = new MessageList({});
    list.data._add_to_hash([
        {id: 10.5, content: "good job"},
        {id: 20.5, content: "ok!"},
    ]);

    // local to local
    list.change_message_id(10.5, 11.5);
    assert.equal(list.get(11.5).content, "good job");

    list.change_message_id(11.5, 11);
    assert.equal(list.get(11).content, "good job");

    list.change_message_id(20.5, 10);
    assert.equal(list.get(10).content, "ok!");

    // test nonexistent id
    assert.equal(list.change_message_id(13, 15), undefined);
});

run_test("last_sent_by_me", () => {
    const list = new MessageList({});
    const items = [
        {
            id: 1,
            sender_id: 3,
        },
        {
            id: 2,
            sender_id: 3,
        },
        {
            id: 3,
            sender_id: 6,
        },
    ];

    list.append(items);
    set_global("page_params", {user_id: 3});
    // Look for the last message where user_id == 3 (our ID)
    assert.equal(list.get_last_message_sent_by_me().id, 2);
});

run_test("local_echo", () => {
    let list = new MessageList({});
    list.append([
        {id: 10},
        {id: 20},
        {id: 30},
        {id: 20.02},
        {id: 20.03},
        {id: 40},
        {id: 50},
        {id: 60},
    ]);
    list._local_only = {20.02: {id: 20.02}, 20.03: {id: 20.03}};

    assert.equal(list.closest_id(10), 10);
    assert.equal(list.closest_id(20), 20);
    assert.equal(list.closest_id(30), 30);
    assert.equal(list.closest_id(20.02), 20.02);
    assert.equal(list.closest_id(20.03), 20.03);
    assert.equal(list.closest_id(29), 30);
    assert.equal(list.closest_id(40), 40);
    assert.equal(list.closest_id(50), 50);
    assert.equal(list.closest_id(60), 60);

    assert.equal(list.closest_id(60), 60);
    assert.equal(list.closest_id(21), 20);
    assert.equal(list.closest_id(29), 30);
    assert.equal(list.closest_id(31), 30);
    assert.equal(list.closest_id(54), 50);
    assert.equal(list.closest_id(58), 60);

    list = new MessageList({});
    list.append([
        {id: 10},
        {id: 20},
        {id: 30},
        {id: 20.02},
        {id: 20.03},
        {id: 40},
        {id: 50},
        {id: 50.01},
        {id: 50.02},
        {id: 60},
    ]);
    list._local_only = {
        20.02: {id: 20.02},
        20.03: {id: 20.03},
        50.01: {id: 50.01},
        50.02: {id: 50.02},
    };

    assert.equal(list.closest_id(10), 10);
    assert.equal(list.closest_id(20), 20);
    assert.equal(list.closest_id(30), 30);
    assert.equal(list.closest_id(20.02), 20.02);
    assert.equal(list.closest_id(20.03), 20.03);
    assert.equal(list.closest_id(40), 40);
    assert.equal(list.closest_id(50), 50);
    assert.equal(list.closest_id(60), 60);

    assert.equal(list.closest_id(60), 60);
    assert.equal(list.closest_id(21), 20);
    assert.equal(list.closest_id(29), 30);
    assert.equal(list.closest_id(31), 30);
    assert.equal(list.closest_id(47), 50);
    assert.equal(list.closest_id(51), 50.02);
    assert.equal(list.closest_id(59), 60);
    assert.equal(list.closest_id(50.01), 50.01);
});

run_test("bookend", (override) => {
    const list = new MessageList({});

    let expected = "translated: You subscribed to stream IceCream";
    list.view.clear_trailing_bookend = noop;
    list.narrowed = true;

    override("narrow_state.stream", () => "IceCream");

    override("stream_data.is_subscribed", () => true);
    override("stream_data.get_sub", () => ({invite_only: false}));

    with_stub((stub) => {
        list.view.render_trailing_bookend = stub.f;
        list.update_trailing_bookend();
        const bookend = stub.get_args("content", "subscribed", "show_button");
        assert.equal(bookend.content, expected);
        assert.equal(bookend.subscribed, true);
        assert.equal(bookend.show_button, true);
    });

    expected = "translated: You unsubscribed from stream IceCream";
    list.last_message_historical = false;
    override("stream_data.is_subscribed", () => false);

    with_stub((stub) => {
        list.view.render_trailing_bookend = stub.f;
        list.update_trailing_bookend();
        const bookend = stub.get_args("content", "subscribed", "show_button");
        assert.equal(bookend.content, expected);
        assert.equal(bookend.subscribed, false);
        assert.equal(bookend.show_button, true);
    });

    // Test when the stream is privates (invite only)
    expected = "translated: You unsubscribed from stream IceCream";
    override("stream_data.is_subscribed", () => false);

    override("stream_data.get_sub", () => ({invite_only: true}));

    with_stub((stub) => {
        list.view.render_trailing_bookend = stub.f;
        list.update_trailing_bookend();
        const bookend = stub.get_args("content", "subscribed", "show_button");
        assert.equal(bookend.content, expected);
        assert.equal(bookend.subscribed, false);
        assert.equal(bookend.show_button, false);
    });

    expected = "translated: You are not subscribed to stream IceCream";
    list.last_message_historical = true;

    with_stub((stub) => {
        list.view.render_trailing_bookend = stub.f;
        list.update_trailing_bookend();
        const bookend = stub.get_args("content", "subscribed", "show_button");
        assert.equal(bookend.content, expected);
        assert.equal(bookend.subscribed, false);
        assert.equal(bookend.show_button, true);
    });
});

run_test("filter_muted_topic_messages", () => {
    const list = new MessageList({
        excludes_muted_topics: true,
    });
    muting.add_muted_topic(1, "muted");

    const unmuted = [
        {
            id: 50,
            type: "stream",
            stream_id: 1,
            mentioned: true, // overrides mute
            topic: "muted",
        },
        {
            id: 60,
            type: "stream",
            stream_id: 1,
            mentioned: false,
            topic: "whatever",
        },
    ];
    const muted = [
        {
            id: 70,
            type: "stream",
            stream_id: 1,
            mentioned: false,
            topic: "muted",
        },
    ];

    // Make sure unmuted_message filters out the "muted" entry,
    // which we mark as having a muted topic, and not mentioned.
    const test_unmuted = list.unmuted_messages(unmuted.concat(muted));
    assert.deepEqual(unmuted, test_unmuted);
});

run_test("add_remove_rerender", () => {
    const filter = accept_all_filter();

    const list = new MessageList({filter});

    const messages = [{id: 1}, {id: 2}, {id: 3}];

    list.add_messages(messages);
    assert.equal(list.num_items(), 3);

    with_stub((stub) => {
        list.rerender = stub.f;
        const message_ids = messages.map((msg) => msg.id);
        list.remove_and_rerender(message_ids);
        assert.equal(stub.num_calls, 1);
        assert.equal(list.num_items(), 0);
    });
});
