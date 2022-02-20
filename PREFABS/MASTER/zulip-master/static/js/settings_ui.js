export function display_checkmark($elem) {
    const check_mark = document.createElement("img");
    check_mark.src = "/static/images/checkbox-green.svg";
    $elem.prepend(check_mark);
    $(check_mark).css("width", "13px");
}

export const strings = {
    success: i18n.t("Saved"),
    failure: i18n.t("Save failed"),
    saving: i18n.t("Saving"),
};

// Generic function for informing users about changes to the settings
// UI.  Intended to replace the old system that was built around
// direct calls to `ui_report`.
export function do_settings_change(request_method, url, data, status_element, opts) {
    const spinner = $(status_element).expectOne();
    spinner.fadeTo(0, 1);
    loading.make_indicator(spinner, {text: strings.saving});
    let success_msg;
    let success_continuation;
    let error_continuation;
    let remove_after = 1000;
    const appear_after = 500;

    if (opts !== undefined) {
        success_msg = opts.success_msg;
        success_continuation = opts.success_continuation;
        error_continuation = opts.error_continuation;
        if (opts.sticky) {
            remove_after = null;
        }
    }
    if (success_msg === undefined) {
        success_msg = strings.success;
    }

    request_method({
        url,
        data,
        success(reponse_data) {
            setTimeout(() => {
                ui_report.success(success_msg, spinner, remove_after);
                display_checkmark(spinner);
            }, appear_after);
            if (success_continuation !== undefined) {
                if (opts !== undefined && opts.success_continuation_arg) {
                    success_continuation(opts.success_continuation_arg);
                } else {
                    success_continuation(reponse_data);
                }
            }
        },
        error(xhr) {
            if (opts !== undefined && opts.error_msg_element) {
                loading.destroy_indicator(spinner);
                ui_report.error(strings.failure, xhr, opts.error_msg_element);
            } else {
                ui_report.error(strings.failure, xhr, spinner);
            }
            if (error_continuation !== undefined) {
                error_continuation(xhr);
            }
        },
    });
}

// This function is used to disable sub-setting when main setting is checked or unchecked
// or two settings are inter-dependent on their values values.
// * is_checked is boolean, shows if the main setting is checked or not.
// * sub_setting_id is sub setting or setting which depend on main setting,
//   string id of setting.
// * disable_on_uncheck is boolean, true if sub setting should be disabled
//   when main setting unchecked.
export function disable_sub_setting_onchange(is_checked, sub_setting_id, disable_on_uncheck) {
    if ((is_checked && disable_on_uncheck) || (!is_checked && !disable_on_uncheck)) {
        $(`#${CSS.escape(sub_setting_id)}`).prop("disabled", false);
        $(`#${CSS.escape(sub_setting_id)}_label`)
            .parent()
            .removeClass("control-label-disabled");
    } else if ((is_checked && !disable_on_uncheck) || (!is_checked && disable_on_uncheck)) {
        $(`#${CSS.escape(sub_setting_id)}`).prop("disabled", true);
        $(`#${CSS.escape(sub_setting_id)}_label`)
            .parent()
            .addClass("control-label-disabled");
    }
}
