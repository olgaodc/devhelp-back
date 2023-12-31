const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true, min: 3},
    surname: {type: String, required: true, min: 3},
    email: {type: String, required: true, min: 8},
    password: {type: String, required: true, min: 13},
    askedQuestionsIds: {type: Array, required: false},
    id: {type: String, required: true, min: 3}
});

module.exports = mongoose.model("User", userSchema);