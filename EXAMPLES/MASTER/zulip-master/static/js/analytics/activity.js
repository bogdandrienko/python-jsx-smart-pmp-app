$(() => {
    $("a.envelope-link").on("click", function () {
        common.copy_data_attribute_value($(this), "admin-emails");
    });
});
export {};
