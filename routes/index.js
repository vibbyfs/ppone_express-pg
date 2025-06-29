const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')

router.get('/', Controller.home)

router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)

router.get('/login', Controller.getLogin)

module.exports = router