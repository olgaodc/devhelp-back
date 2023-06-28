const express = require('express');
const router = express.Router();
// const authMiddleware = require("../middleware/auth");
const {
    SIGN_UP,
    LOG_IN,
    // GET_ALL_USERS_WITH_QUESTIONS,
    // GET_USER_BY_ID_WITH_TICKETS,
} = require('../controllers/user');

router.post('/signUp', SIGN_UP);
router.post('/logIn', LOG_IN);

module.exports = router;