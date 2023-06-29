const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    ADD_ANSWER,
    // GET_ALL_ANSWERS_BY_QUESTION_ID,
    // UPDATE_LIKES_NUMBER,
    // DELETE_ANSWER,
} = require('../controllers/answer');

router.post('/question/:id/answer', authMiddleware, ADD_ANSWER);
// router.get('/question/:id/answers', authMiddleware, GET_ALL_ANSWERS_BY_QUESTION_ID);
// router.put('/question/:id/answer', authMiddleware, UPDATE_LIKES_NUMBER);
// router.delete('/answer/:id', authMiddleware, DELETE_ANSWER);

module.exports = router;