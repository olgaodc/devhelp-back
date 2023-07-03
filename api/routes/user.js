const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    SIGN_UP,
    LOG_IN,
    CHECK_IS_USER_LOGGED_IN,
} = require('../controllers/user');

router.post('/signUp', SIGN_UP);
router.post('/logIn', LOG_IN);
router.get('/auth', authMiddleware, CHECK_IS_USER_LOGGED_IN);

module.exports = router;