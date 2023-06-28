const uniqid = require('uniqid');
const AnswerModel = require("../models/answer");
const QuestionModel = require("../models/question");

module.exports.ADD_ANSWER = async (req, res) => {
    try {
        const answer = new AnswerModel({
            text: req.body.text,
            id: uniqid(),
            likes_number: 0, //??????
            creatorId: req.body.userId,
        });

        const addedAnswer = await answer.save();

        QuestionModel.updateOne(
            {id: req.params.id},
            {$push: {answers_ids: addedAnswer.id}}
        ).exec();

        return res.status(200).json({response: 'Answer added successfully'});

    } catch (err) {
        console.log(err);
        return res.status(500).json({response: 'Error, please try later'});
    }
}