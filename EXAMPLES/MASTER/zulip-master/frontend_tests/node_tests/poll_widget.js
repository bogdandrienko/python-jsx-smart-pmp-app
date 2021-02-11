"use strict";

const {strict: assert} = require("assert");

const {stub_templates} = require("../zjsunit/handlebars");
const {set_global, zrequire} = require("../zjsunit/namespace");
const {run_test} = require("../zjsunit/test");
const {make_zjquery} = require("../zjsunit/zjquery");

const poll_widget = zrequire("poll_widget");

set_global("$", make_zjquery());

const people = zrequire("people");

const return_false = () => false;
const return_true = () => true;

run_test("PollData my question", () => {
    const is_my_poll = true;
    const question = "Favorite color?";

    const sender_id = 99;
    people.my_current_user_id = () => sender_id;

    const data_holder = new poll_widget.PollData(is_my_poll, question, []);

    let data = data_holder.get_widget_data();

    assert.deepEqual(data, {
        options: [],
        question: "Favorite color?",
    });

    const question_event = {
        type: "question",
        question: "best plan?",
    };

    data_holder.handle_event(sender_id, question_event);
    data = data_holder.get_widget_data();

    assert.deepEqual(data, {
        options: [],
        question: "best plan?",
    });

    const option_event = {
        type: "new_option",
        idx: 1,
        option: "release now",
    };

    people.safe_full_names = () => "";

    data_holder.handle_event(sender_id, option_event);
    data = data_holder.get_widget_data();

    assert.deepEqual(data, {
        options: [
            {
                option: "release now",
                names: "",
                count: 0,
                key: "99,1",
                current_user_vote: false,
            },
        ],
        question: "best plan?",
    });

    let vote_event = {
        type: "vote",
        key: "99,1",
        vote: 1,
    };

    data_holder.handle_event(sender_id, vote_event);
    data = data_holder.get_widget_data();

    assert.deepEqual(data, {
        options: [
            {
                option: "release now",
                names: "",
                count: 1,
                key: "99,1",
                current_user_vote: true,
            },
        ],
        question: "best plan?",
    });

    const invalid_vote_event = {
        type: "vote",
        key: "98,1",
        vote: 1,
    };

    blueslip.expect("warn", `unknown key for poll: ${invalid_vote_event.key}`);
    data_holder.handle_event(sender_id, invalid_vote_event);
    data = data_holder.get_widget_data();

    const option_outbound_event = data_holder.handle.new_option.outbound("new option");
    assert.deepEqual(option_outbound_event, {
        type: "new_option",
        idx: 2,
        option: "new option",
    });

    const new_question = "Any new plan?";
    const question_outbound_event = data_holder.handle.question.outbound(new_question);
    assert.deepEqual(question_outbound_event, {
        type: "question",
        question: new_question,
    });

    const vote_outbound_event = data_holder.handle.vote.outbound("99,1");
    assert.deepEqual(vote_outbound_event, {type: "vote", key: "99,1", vote: -1});

    vote_event = {
        type: "vote",
        key: "99,1",
        vote: -1,
    };

    data_holder.handle_event(sender_id, vote_event);
    data = data_holder.get_widget_data();

    assert.deepEqual(data, {
        options: [
            {
                option: "release now",
                names: "",
                count: 0,
                key: "99,1",
                current_user_vote: false,
            },
        ],
        question: "best plan?",
    });
});

run_test("activate another person poll", () => {
    people.is_my_user_id = return_false;
    stub_templates((template_name) => {
        if (template_name === "widgets/poll_widget") {
            return "widgets/poll_widget";
        }
        if (template_name === "widgets/poll_widget_results") {
            return "widgets/poll_widget_results";
        }
        throw new Error(`Unknown template ${template_name}`);
    });

    const widget_elem = $("<div>").addClass("widget-content");

    let out_data; // Used to check the event data sent to the server
    const callback = (data) => {
        out_data = data;
    };

    const opts = {
        elem: widget_elem,
        callback,
        message: {
            sender_id: 100,
        },
        extra_data: {
            question: "What do you want?",
        },
    };

    const set_widget_find_result = (selector) => {
        const elem = $.create(selector);
        widget_elem.set_find_results(selector, elem);
        return elem;
    };

    const poll_option = set_widget_find_result("button.poll-option");
    const poll_option_input = set_widget_find_result("input.poll-option");
    const widget_option_container = set_widget_find_result("ul.poll-widget");

    const poll_question_submit = set_widget_find_result("button.poll-question-check");
    const poll_edit_question = set_widget_find_result(".poll-edit-question");
    const poll_question_header = set_widget_find_result(".poll-question-header");
    const poll_question_container = set_widget_find_result(".poll-question-bar");
    const poll_option_container = set_widget_find_result(".poll-option-bar");

    const poll_vote_button = set_widget_find_result("button.poll-vote");
    const poll_please_wait = set_widget_find_result(".poll-please-wait");
    const poll_author_help = set_widget_find_result(".poll-author-help");

    set_widget_find_result("button.poll-question-remove");
    set_widget_find_result("input.poll-question");

    poll_widget.activate(opts);

    assert(poll_option_container.visible());
    assert(poll_question_header.visible());

    assert(!poll_question_container.visible());
    assert(!poll_question_submit.visible());
    assert(!poll_edit_question.visible());
    assert(!poll_please_wait.visible());
    assert(!poll_author_help.visible());

    assert.equal(widget_elem.html(), "widgets/poll_widget");
    assert.equal(widget_option_container.html(), "widgets/poll_widget_results");
    assert.equal(poll_question_header.text(), "What do you want?");

    {
        /* Testing data sent to server on adding option */
        poll_option_input.val("cool choice");
        out_data = undefined;
        poll_option.trigger("click");
        assert.deepEqual(out_data, {type: "new_option", idx: 1, option: "cool choice"});

        poll_option_input.val("");
        out_data = undefined;
        poll_option.trigger("click");
        assert.deepEqual(out_data, undefined);
    }

    const vote_events = [
        {
            sender_id: 100,
            data: {
                type: "new_option",
                idx: 1,
                option: "release now",
            },
        },
        {
            sender_id: 100,
            data: {
                type: "vote",
                key: "100,1",
                vote: 1,
            },
        },
    ];

    widget_elem.handle_events(vote_events);

    {
        /* Testing data sent to server on voting */
        poll_vote_button.attr("data-key", "100,1");
        out_data = undefined;
        poll_vote_button.trigger("click");
        assert.deepEqual(out_data, {type: "vote", key: "100,1", vote: 1});
    }

    const add_question_event = [
        {
            sender_id: 100,
            data: {
                type: "question",
                question: "best plan?",
            },
        },
    ];

    widget_elem.handle_events(add_question_event);
});

run_test("activate own poll", () => {
    $.clear_all_elements();

    people.is_my_user_id = return_true;
    stub_templates((template_name) => {
        if (template_name === "widgets/poll_widget") {
            return "widgets/poll_widget";
        }
        if (template_name === "widgets/poll_widget_results") {
            return "widgets/poll_widget_results";
        }
        throw new Error(`Unknown template ${template_name}`);
    });

    const widget_elem = $("<div>").addClass("widget-content");
    let out_data;
    const callback = (data) => {
        out_data = data;
    };
    const opts = {
        elem: widget_elem,
        callback,
        message: {
            sender_id: 100,
        },
        extra_data: {
            question: "Where to go?",
        },
    };

    const set_widget_find_result = (selector) => {
        const elem = $.create(selector);
        widget_elem.set_find_results(selector, elem);
        return elem;
    };

    set_widget_find_result("button.poll-option");
    const poll_option_input = set_widget_find_result("input.poll-option");
    const widget_option_container = set_widget_find_result("ul.poll-widget");

    const poll_question_submit = set_widget_find_result("button.poll-question-check");
    const poll_edit_question = set_widget_find_result(".poll-edit-question");
    const poll_question_input = set_widget_find_result("input.poll-question");
    const poll_question_header = set_widget_find_result(".poll-question-header");
    const poll_question_container = set_widget_find_result(".poll-question-bar");
    const poll_option_container = set_widget_find_result(".poll-option-bar");

    set_widget_find_result("button.poll-vote");
    const poll_please_wait = set_widget_find_result(".poll-please-wait");
    const poll_author_help = set_widget_find_result(".poll-author-help");

    set_widget_find_result("button.poll-question-remove");

    function assert_visibility() {
        assert(poll_option_container.visible());
        assert(poll_question_header.visible());
        assert(!poll_question_container.visible());
        assert(poll_edit_question.visible());
        assert(!poll_please_wait.visible());
        assert(!poll_author_help.visible());
    }

    poll_widget.activate(opts);

    assert_visibility();
    assert(!poll_question_submit.visible());

    assert.equal(widget_elem.html(), "widgets/poll_widget");
    assert.equal(widget_option_container.html(), "widgets/poll_widget_results");
    assert.equal(poll_question_header.text(), "Where to go?");

    {
        /* Testing data sent to server on editing question */
        poll_question_input.val("Is it new?");
        out_data = undefined;
        poll_question_submit.trigger("click");
        assert.deepEqual(out_data, {type: "question", question: "Is it new?"});

        assert_visibility();
        assert(poll_question_submit.visible());

        poll_option_input.val("");
        out_data = undefined;
        poll_question_submit.trigger("click");
        assert.deepEqual(out_data, undefined);
    }
});
