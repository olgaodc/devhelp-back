const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    text: {type: String, required: true, min: 5},
    id: {type: String, required: true, min: 3},
    creationDate: {type: Date, required: true},
    answers_ids: {type: Array, required: false},

});

module.exports = mongoose.model("Question", questionSchema);