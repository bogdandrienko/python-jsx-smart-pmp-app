document.getElementById("rational_offering_members_button").addEventListener("click", function() {
    copy(document.getElementById(this.id));
});
document.getElementById("rational_conclusion_button").addEventListener("click", function() {
    copy(document.getElementById(this.id));
});
document.getElementById("rational_change_documentations_button").addEventListener("click", function() {
    copy(document.getElementById(this.id));
});
document.getElementById("rational_responsible_members_button").addEventListener("click", function() {
    copy(document.getElementById(this.id));
});

function copy(button) {
    var target = document.createElement("textarea");
    target.style.position = "absolute";
    target.style.left = "-9999px";
    target.style.top = "0";
    target.id = "textarea " + button.id;
    target.value = button.placeholder;
    document.body.appendChild(target);
    var copyText = document.getElementById("textarea " + button.id);
    copyText.select();
    document.execCommand("copy");

    // /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
}