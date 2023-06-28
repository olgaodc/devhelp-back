const uniqid = require('uniqid');
const QuestionModel = require("../models/question");
const UserModel = require("../models/user");

module.exports.ADD_QUESTION = async (req, res) => {
    try {
        const question = new QuestionModel({
            text: req.body.text,
            id: uniqid(),
            creationDate: new Date(),
            answers_ids: [],
        });

        const addedQuestion = await question.save();

        UserModel.updateOne(
            {id: req.body.userId},
            {$push: {asked_questions_ids: addedQuestion.id}}
        ).exec();

        return res.status(200).json({response: 'Question added successfully'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({response: 'Error, please try later'});
    }
}