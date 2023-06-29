const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    text: {type: String, required: true, min: 5},
    id: {type: String, required: true, min: 3},
    likesNumber: {type: Number, required: false},
    creationDate: {type: Date, required: true},
    creatorId: {type: String, required: true},
});

module.exports = mongoose.model("Answer", answerSchema);