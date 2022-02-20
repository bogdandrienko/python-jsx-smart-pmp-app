"use strict";

const {strict: assert} = require("assert");

const {set_global, zrequire} = require("../zjsunit/namespace");
const {run_test} = require("../zjsunit/test");

const stream_data = zrequire("stream_data");
const peer_data = zrequire("peer_data");
const people = zrequire("people");
const compose_fade = zrequire("compose_fade");

const me = {
    email: "me@example.com",
    user_id: 30,
    full_name: "Me Myself",
};

const alice = {
    email: "alice@example.com",
    user_id: 31,
    full_name: "Alice",
};

const bob = {
    email: "bob@example.com",
    user_id: 32,
    full_name: "Bob",
};

people.add_active_user(me);
people.initialize_current_user(me.user_id);

people.add_active_user(alice);
people.add_active_user(bob);

run_test("set_focused_recipient", () => {
    const sub = {
        stream_id: 101,
        name: "social",
        subscribed: true,
        can_access_subscribers: true,
    };
    stream_data.add_sub(sub);
    peer_data.set_subscribers(sub.stream_id, [me.user_id, alice.user_id]);

    set_global("$", (selector) => {
        switch (selector) {
            case "#stream_message_recipient_stream":
                return {
                    val() {
                        return "social";
                    },
                };
            case "#stream_message_recipient_topic":
                return {
                    val() {
                        return "lunch";
                    },
                };
            default:
                throw new Error(`Unknown selector ${selector}`);
        }
    });

    compose_fade.set_focused_recipient("stream");

    assert.equal(compose_fade.would_receive_message(me.user_id), true);
    assert.equal(compose_fade.would_receive_message(alice.user_id), true);
    assert.equal(compose_fade.would_receive_message(bob.user_id), false);

    const good_msg = {
        type: "stream",
        stream_id: 101,
        topic: "lunch",
    };
    const bad_msg = {
        type: "stream",
        stream_id: 999,
        topic: "lunch",
    };
    assert(!compose_fade.should_fade_message(good_msg));
    assert(compose_fade.should_fade_message(bad_msg));
});
