const express = require('express');
const { registerUser, loginUser, logOutUser } = require('../controllers/authController');
const router = express.Router();
debugger;
router.post('/register', registerUser);
router.post('/Login', loginUser);
router.post('/logout', logOutUser);

module.exports = router;