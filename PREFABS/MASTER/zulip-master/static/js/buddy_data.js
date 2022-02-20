"use strict";

const people = require("./people");
const user_status = require("./user_status");
const util = require("./util");
/*

   This is the main model code for building the buddy list.
   We also rely on presence.js to compute the actual presence
   for users.  We glue in other "people" data and do
   filtering/sorting of the data that we'll send into the view.

*/

exports.max_size_before_shrinking = 600;

const fade_config = {
    get_user_id(item) {
        return item.user_id;
    },
    fade(item) {
        item.faded = true;
    },
    unfade(item) {
        item.faded = false;
    },
};

exports.get_user_circle_class = function (user_id) {
    const status = exports.buddy_status(user_id);

    switch (status) {
        case "active":
            return "user_circle_green";
        case "idle":
            return "user_circle_orange";
        case "away_them":
        case "away_me":
            return "user_circle_empty_line";
        default:
            return "user_circle_empty";
    }
};

exports.status_description = function (user_id) {
    const status = exports.buddy_status(user_id);

    switch (status) {
        case "active":
            return i18n.t("Active");
        case "idle":
            return i18n.t("Idle");
        case "away_them":
        case "away_me":
            return i18n.t("Unavailable");
        default:
            return i18n.t("Offline");
    }
};

exports.level = function (user_id) {
    if (people.is_my_user_id(user_id)) {
        // Always put current user at the top.
        return 0;
    }

    const status = exports.buddy_status(user_id);

    switch (status) {
        case "active":
            return 1;
        case "idle":
            return 2;
        case "away_them":
            return 3;
        default:
            return 3;
    }
};

exports.buddy_status = function (user_id) {
    if (user_status.is_away(user_id)) {
        if (people.is_my_user_id(user_id)) {
            return "away_me";
        }

        return "away_them";
    }

    // get active/idle/etc.
    return presence.get_status(user_id);
};

exports.compare_function = function (a, b) {
    const level_a = exports.level(a);
    const level_b = exports.level(b);
    const diff = level_a - level_b;
    if (diff !== 0) {
        return diff;
    }

    // Sort equivalent PM names alphabetically
    const person_a = people.get_by_user_id(a);
    const person_b = people.get_by_user_id(b);

    const full_name_a = person_a ? person_a.full_name : "";
    const full_name_b = person_b ? person_b.full_name : "";

    return util.strcmp(full_name_a, full_name_b);
};

exports.sort_users = function (user_ids) {
    // TODO sort by unread count first, once we support that
    user_ids.sort(exports.compare_function);
    return user_ids;
};

function filter_user_ids(user_filter_text, user_ids) {
    if (user_filter_text === "") {
        return user_ids;
    }

    user_ids = user_ids.filter((user_id) => !people.is_my_user_id(user_id));

    let search_terms = user_filter_text.toLowerCase().split(/[,|]+/);
    search_terms = search_terms.map((s) => s.trim());

    const persons = user_ids.map((user_id) => people.get_by_user_id(user_id));

    const user_id_dict = people.filter_people_by_search_terms(persons, search_terms);
    return Array.from(user_id_dict.keys());
}

exports.matches_filter = function (user_filter_text, user_id) {
    // This is a roundabout way of checking a user if you look
    // too hard at it, but it should be fine for now.
    return filter_user_ids(user_filter_text, [user_id]).length === 1;
};

function get_num_unread(user_id) {
    return unread.num_unread_for_person(user_id.toString());
}

exports.get_my_user_status = function (user_id) {
    if (!people.is_my_user_id(user_id)) {
        return undefined;
    }

    if (user_status.is_away(user_id)) {
        return i18n.t("(unavailable)");
    }

    return i18n.t("(you)");
};

exports.user_last_seen_time_status = function (user_id) {
    const status = presence.get_status(user_id);
    if (status === "active") {
        return i18n.t("Active now");
    }

    if (page_params.realm_is_zephyr_mirror_realm) {
        // We don't send presence data to clients in Zephyr mirroring realms
        return i18n.t("Unknown");
    }

    // There are situations where the client has incomplete presence
    // history on a user.  This can happen when users are deactivated,
    // or when they just haven't been present in a long time (and we
    // may have queries on presence that go back only N weeks).
    //
    // We give the somewhat vague status of "Unknown" for these users.
    const last_active_date = presence.last_active_date(user_id);
    if (last_active_date === undefined) {
        return i18n.t("More than 2 weeks ago");
    }
    return timerender.last_seen_status_from_date(last_active_date);
};

exports.info_for = function (user_id) {
    const user_circle_class = exports.get_user_circle_class(user_id);
    const person = people.get_by_user_id(user_id);
    const my_user_status = exports.get_my_user_status(user_id);
    const user_circle_status = exports.status_description(user_id);

    return {
        href: hash_util.pm_with_uri(person.email),
        name: person.full_name,
        user_id,
        my_user_status,
        is_current_user: people.is_my_user_id(user_id),
        num_unread: get_num_unread(user_id),
        user_circle_class,
        user_circle_status,
    };
};

function get_last_seen(active_status, last_seen) {
    if (active_status === "active") {
        return last_seen;
    }

    const last_seen_text = i18n.t("Last active: __last_seen__", {last_seen});
    return last_seen_text;
}

exports.get_title_data = function (user_ids_string, is_group) {
    if (is_group === true) {
        // For groups, just return a string with recipient names.
        return {
            first_line: people.get_recipients(user_ids_string),
            second_line: "",
            third_line: "",
        };
    }

    // Since it's not a group, user_ids_string is a single user ID.
    const user_id = Number.parseInt(user_ids_string, 10);
    const person = people.get_by_user_id(user_id);

    if (person.is_bot) {
        const bot_owner = people.get_bot_owner_user(person);

        if (bot_owner) {
            const bot_owner_name = i18n.t("Owner: __name__", {name: bot_owner.full_name});

            return {
                first_line: person.full_name,
                second_line: bot_owner_name,
                third_line: "",
            };
        }

        // Bot does not have an owner.
        return {
            first_line: person.full_name,
            second_line: "",
            third_line: "",
        };
    }

    // For buddy list and individual PMS.  Since is_group=False, it's
    // a single, human, user.
    const active_status = presence.get_status(user_id);
    const last_seen = exports.user_last_seen_time_status(user_id);

    // Users has a status.
    if (user_status.get_status_text(user_id)) {
        return {
            first_line: person.full_name,
            second_line: user_status.get_status_text(user_id),
            third_line: get_last_seen(active_status, last_seen),
        };
    }

    // Users does not have a status.
    return {
        first_line: person.full_name,
        second_line: get_last_seen(active_status, last_seen),
        third_line: "",
    };
};

exports.get_item = function (user_id) {
    const info = exports.info_for(user_id);
    compose_fade.update_user_info([info], fade_config);
    return info;
};

function user_is_recently_active(user_id) {
    // return true if the user has a green/orange circle
    return exports.level(user_id) <= 2;
}

function maybe_shrink_list(user_ids, user_filter_text) {
    if (user_ids.length <= exports.max_size_before_shrinking) {
        return user_ids;
    }

    if (user_filter_text) {
        // If the user types something, we want to show all
        // users matching the text, even if they have not been
        // online recently.
        // For super common letters like "s", we may
        // eventually want to filter down to only users that
        // are in presence.get_user_ids().
        return user_ids;
    }

    user_ids = user_ids.filter((user_id) => user_is_recently_active(user_id));

    return user_ids;
}

function get_user_id_list(user_filter_text) {
    let user_ids;

    if (user_filter_text) {
        // If there's a filter, select from all users, not just those
        // recently active.
        user_ids = filter_user_ids(user_filter_text, people.get_active_user_ids());
    } else {
        // From large realms, the user_ids in presence may exclude
        // users who have been idle more than three weeks.  When the
        // filter text is blank, we show only those recently active users.
        user_ids = presence.get_user_ids();
    }

    user_ids = user_ids.filter((user_id) => {
        const person = people.get_by_user_id(user_id);

        if (!person) {
            blueslip.warn("Got user_id in presence but not people: " + user_id);
            return false;
        }

        // if the user is bot, do not show in presence data.
        return !person.is_bot;
    });
    return user_ids;
}

exports.get_filtered_and_sorted_user_ids = function (user_filter_text) {
    let user_ids;
    user_ids = get_user_id_list(user_filter_text);
    user_ids = maybe_shrink_list(user_ids, user_filter_text);
    return exports.sort_users(user_ids);
};

exports.get_items_for_users = function (user_ids) {
    const user_info = user_ids.map((user_id) => exports.info_for(user_id));
    compose_fade.update_user_info(user_info, fade_config);
    return user_info;
};

exports.huddle_fraction_present = function (huddle) {
    const user_ids = huddle.split(",").map((s) => Number.parseInt(s, 10));

    let num_present = 0;

    for (const user_id of user_ids) {
        if (presence.is_active(user_id)) {
            num_present += 1;
        }
    }

    if (num_present === user_ids.length) {
        return 1;
    } else if (num_present !== 0) {
        return 0.5;
    }
    return undefined;
};

window.buddy_data = exports;
