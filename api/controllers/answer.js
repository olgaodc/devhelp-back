const uniqid = require('uniqid');
const AnswerModel = require("../models/answer");
const QuestionModel = require("../models/question");

module.exports.ADD_ANSWER = async (req, res) => {
  try {
    const answer = new AnswerModel({
      text: req.body.text,
      id: uniqid(),
      likesNumber: 0, //??????
      creationDate: new Date(),
      creatorId: req.body.userId,
    });

    const addedAnswer = await answer.save();

    QuestionModel.updateOne(
      { id: req.params.id },
      { $push: { answersIds: addedAnswer.id } }
    ).exec();

    return res.status(200).json({ response: 'Answer added successfully' });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}


// module.exports.GET_ALL_ANSWERS_BY_QUESTION_ID = async (req, res) => {
//   try {
//     const questionData = await QuestionModel.aggregate([
//       {
//         $lookup: {
//           from: 'answers',
//           localField: 'answersIds',
//           foreignField: 'id',
//           as: 'answers',
//         }
//       }, {$match: {id: req.params.id}}
//     ]).exec();
//     return res.status(200).json({question: questionData});
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ response: 'Error, please try later' });
//   }
// }


module.exports.UPDATE_LIKES_NUMBER = async (req, res) => {
  try {
    const updateLikesNumber = await AnswerModel.findOneAndUpdate(
      {id: req.params.id},
      {likesNumber: req.body.likesNumber}
    );
    return res.status(200).json({response: 'Likes number updated successfully'});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}

module.exports.DELETE_ANSWER = async (req, res) => {
  try {
    const deleteAnswer = await AnswerModel.findOneAndDelete({id: req.params.id});

    if(!deleteAnswer) {
      return res.status(404).json({response: 'Answer not found'});
    }

    QuestionModel.updateOne(
      { id: req.params.questionId },
      { $pull: { answersIds: deleteAnswer.id } }
    ).exec();

    return res.status(200).json({response: 'Answer deleted successfully'});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}