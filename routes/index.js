const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')

router.get('/', Controller.home)

module.exports = router