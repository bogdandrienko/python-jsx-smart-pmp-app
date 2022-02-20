import * as people from "./people";
import * as settings_data from "./settings_data";
import * as stream_pill from "./stream_pill";

export function set_up(input, pills, opts) {
    let source = opts.source;
    if (!opts.source) {
        source = () => user_pill.typeahead_source(pills);
    }
    const include_streams = (query) => opts.stream && query.trim().startsWith("#");

    input.typeahead({
        items: 5,
        fixed: true,
        dropup: true,
        source() {
            if (include_streams(this.query)) {
                return stream_pill.typeahead_source(pills);
            }

            return source();
        },
        highlighter(item) {
            if (include_streams(this.query)) {
                return typeahead_helper.render_stream(item);
            }

            return typeahead_helper.render_person(item);
        },
        matcher(item) {
            let query = this.query.toLowerCase();
            query = query.replace(/\u00A0/g, String.fromCharCode(32));

            if (include_streams(query)) {
                query = query.trim().slice(1);
                return item.name.toLowerCase().includes(query);
            }

            if (!settings_data.show_email()) {
                return item.full_name.toLowerCase().includes(query);
            }
            const email = people.get_visible_email(item);
            return (
                email.toLowerCase().includes(query) || item.full_name.toLowerCase().includes(query)
            );
        },
        sorter(matches) {
            if (include_streams(this.query)) {
                return typeahead_helper.sort_streams(matches, this.query.trim().slice(1));
            }

            return typeahead_helper.sort_recipientbox_typeahead(this.query, matches, "");
        },
        updater(item) {
            if (include_streams(this.query)) {
                stream_pill.append_stream(item, pills);
            } else {
                user_pill.append_user(item, pills);
            }

            input.trigger("focus");
            if (opts.update_func) {
                opts.update_func();
            }
        },
        stopAdvance: true,
    });
}
