const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    text: {type: String, required: true, min: 10},
    description: {type: String, required: true, min: 20},
    id: {type: String, required: true, min: 3},
    creationDate: {type: Date, required: true},
    answersIds: {type: Array, required: false},

});

module.exports = mongoose.model("Question", questionSchema);