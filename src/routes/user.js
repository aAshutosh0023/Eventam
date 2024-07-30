const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/register', userController.getRegisterPage);
router.post('/register', userController.register);
router.get('/login', userController.getLoginPage);
router.post('/login', userController.login);

module.exports = router;
