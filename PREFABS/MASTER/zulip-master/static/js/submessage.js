"use strict";

exports.get_message_events = function (message) {
    if (message.locally_echoed) {
        return undefined;
    }

    if (!message.submessages) {
        return undefined;
    }

    if (message.submessages.length === 0) {
        return undefined;
    }

    message.submessages.sort((m1, m2) => Number.parseInt(m1.id, 10) - Number.parseInt(m2.id, 10));

    const events = message.submessages.map((obj) => ({
        sender_id: obj.sender_id,
        data: JSON.parse(obj.content),
    }));

    return events;
};

exports.process_submessages = function (in_opts) {
    // This happens in our rendering path, so we try to limit any
    // damage that may be triggered by one rogue message.
    try {
        return exports.do_process_submessages(in_opts);
    } catch (error) {
        blueslip.error("in process_submessages: " + error.message);
        return undefined;
    }
};

exports.do_process_submessages = function (in_opts) {
    const message_id = in_opts.message_id;
    const message = message_store.get(message_id);

    if (!message) {
        return;
    }

    const events = exports.get_message_events(message);

    if (!events) {
        return;
    }

    const row = in_opts.row;

    // Right now, our only use of submessages is widgets.

    const data = events[0].data;

    if (data === undefined) {
        return;
    }

    const widget_type = data.widget_type;

    if (widget_type === undefined) {
        return;
    }

    const post_to_server = exports.make_server_callback(message_id);

    widgetize.activate({
        widget_type,
        extra_data: data.extra_data,
        events,
        row,
        message,
        post_to_server,
    });
};

exports.update_message = function (submsg) {
    const message = message_store.get(submsg.message_id);

    if (message === undefined) {
        // This is generally not a problem--the server
        // can send us events without us having received
        // the original message, since the server doesn't
        // track that.
        return;
    }

    if (message.submessages === undefined) {
        message.submessages = [];
    }

    const existing = message.submessages.find((sm) => sm.id === submsg.id);

    if (existing !== undefined) {
        blueslip.warn("Got submessage multiple times: " + submsg.id);
        return;
    }

    message.submessages.push(submsg);
};

exports.handle_event = function (submsg) {
    // Update message.submessages in case we haven't actually
    // activated the widget yet, so that when the message does
    // come in view, the data will be complete.
    exports.update_message(submsg);

    // Right now, our only use of submessages is widgets.
    const msg_type = submsg.msg_type;

    if (msg_type !== "widget") {
        blueslip.warn("unknown msg_type: " + msg_type);
        return;
    }

    let data;

    try {
        data = JSON.parse(submsg.content);
    } catch {
        blueslip.error("server sent us invalid json in handle_event: " + submsg.content);
        return;
    }

    widgetize.handle_event({
        sender_id: submsg.sender_id,
        message_id: submsg.message_id,
        data,
    });
};

exports.make_server_callback = function (message_id) {
    return function (opts) {
        const url = "/json/submessage";

        channel.post({
            url,
            data: {
                message_id,
                msg_type: opts.msg_type,
                content: JSON.stringify(opts.data),
            },
        });
    };
};

window.submessage = exports;
