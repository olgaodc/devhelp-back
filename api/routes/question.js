const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    ADD_QUESTION,
    // GET_QUESTION,
    // GET_ALL_QUESTIONS,
    // DELETE_QUESTION,
} = require('../controllers/question');

router.post('/question', authMiddleware, ADD_QUESTION);
// router.get('/question/:id', authMiddleware, GET_QUESTION);
// router.get('/questions', authMiddleware, GET_ALL_QUESTIONS);
// router.delete('/question/:id', authMiddleware, DELETE_QUESTION);

module.exports = router;