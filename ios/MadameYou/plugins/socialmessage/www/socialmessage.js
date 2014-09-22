
var exec = require("cordova/exec");

var SocialMessage = function () {
    this.name = "SocialMessage";
};

function getAllActivityTypes() {
    return ["PostToFacebook", "PostToTwitter", "PostToWeibo", "Message",
        "Mail", "Print", "CopyToPasteboard", "AssignToContact", "SaveToCameraRoll"];
}

SocialMessage.prototype.send = function (message, activityTypes) {
    if (typeof (activityTypes) === "undefined" || activityTypes === null) {
        activityTypes = getAllActivityTypes();
    }
    var options = {
        "message": message,
        "activityTypes": activityTypes.join(",")
    };
    console.log([options]);
    exec(null, null, "SocialMessage", "send", [options]);
};

module.exports = new SocialMessage();
