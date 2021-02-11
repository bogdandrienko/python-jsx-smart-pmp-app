const away_user_ids = new Set();
const user_info = new Map();

export function server_update(opts) {
    channel.post({
        url: "/json/users/me/status",
        data: {
            away: opts.away,
            status_text: opts.status_text,
        },
        idempotent: true,
        success() {
            if (opts.success) {
                opts.success();
            }
        },
    });
}

export function server_set_away() {
    server_update({away: true});
}

export function server_revoke_away() {
    server_update({away: false});
}

export function set_away(user_id) {
    if (typeof user_id !== "number") {
        blueslip.error("need ints for user_id");
    }
    away_user_ids.add(user_id);
}

export function revoke_away(user_id) {
    if (typeof user_id !== "number") {
        blueslip.error("need ints for user_id");
    }
    away_user_ids.delete(user_id);
}

export function is_away(user_id) {
    return away_user_ids.has(user_id);
}

export function get_status_text(user_id) {
    return user_info.get(user_id);
}

export function set_status_text(opts) {
    if (!opts.status_text) {
        user_info.delete(opts.user_id);
        return;
    }

    user_info.set(opts.user_id, opts.status_text);
}

export function initialize(params) {
    for (const [str_user_id, dct] of Object.entries(params.user_status)) {
        // JSON does not allow integer keys, so we
        // convert them here.
        const user_id = Number.parseInt(str_user_id, 10);

        if (dct.away) {
            away_user_ids.add(user_id);
        }

        if (dct.status_text) {
            user_info.set(user_id, dct.status_text);
        }
    }
}
