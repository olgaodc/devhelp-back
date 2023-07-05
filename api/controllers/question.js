const uniqid = require('uniqid');
const QuestionModel = require("../models/question");
const UserModel = require("../models/user");
const AnswerModel = require("../models/answer");

module.exports.ADD_QUESTION = async (req, res) => {
  try {
    const question = new QuestionModel({
      text: req.body.text,
      description: req.body.description,
      id: uniqid(),
      creationDate: new Date(),
      answersIds: [],
    });

    const addedQuestion = await question.save();

    UserModel.updateOne(
      { id: req.body.userId },
      { $push: { askedQuestionsIds: addedQuestion.id } }
    ).exec();

    return res.status(200).json({ response: 'Question added successfully', question: addedQuestion });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}

module.exports.GET_QUESTION = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });
    

    if (!question) {
      return res.status(404).json({ response: 'Question not found' });
    }

    const questionInfo = await QuestionModel.aggregate([
      {
        $lookup: {
          from: 'answers',
          localField: 'answersIds',
          foreignField: 'id',
          as: 'questionAnswers',
        }
      }, { $match: { id: question.id } }
    ]).exec();

    return res.status(200).json({ question: questionInfo });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}

module.exports.GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find();

    if(!questions) {
      return res.status(404).json({response: 'Questions not found'});
    }

    return res.status(200).json({questions: questions});
  } catch (err) {
    console.log(err);
    return res.status(500).json({response: 'Error, please try later'});
  }
}

module.exports.DELETE_QUESTION = async (req, res) => {
  try {
    const deletedQuestion = await QuestionModel.findOneAndDelete({id: req.params.id});
    
    if(!deletedQuestion) {
      return res.status(404).json({response: 'Question not found'});
    }

    await AnswerModel.deleteMany({ id: { $in: deletedQuestion.answersIds } });

    await UserModel.updateOne(
      { id: req.body.userId },
      { $pull: { askedQuestionsIds: deletedQuestion.id } }
    ).exec();

    return res.status(200).json({response: 'Question deleted successfully'});

  } catch (err) {
    console.log(err);
    return res.status(500).json({response: 'Error, please try later'});
  }
}