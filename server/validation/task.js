const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateTaskInput(data) {
    data.name = validText(data.name) ? data.name : "";

    if (Validator.isEmpty(data.name)) {
        return { message: "Name field is required", isValid: false };
    }

    return {
        message: "",
        isValid: true
    };
};