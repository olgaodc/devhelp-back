const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    text: {type: String, required: true, min: 5},
    id: {type: String, required: true, min: 3},
    likes_number: {type: Number, required: false},
    creatorId: {type: String, required: true},
});

module.exports = mongoose.model("Answer", answerSchema);