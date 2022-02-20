"use strict";

// This file is being eliminated as part of the general purge of
// global variables from Zulip (everything is being moved into
// modules).  Please don't add things here.

const home_msg_list = new message_list.MessageList({
    table_name: "zhome",
    filter: new Filter([{operator: "in", operand: "home"}]),
    excludes_muted_topics: true,
});

window.home_msg_list = home_msg_list;
window.current_msg_list = home_msg_list;
