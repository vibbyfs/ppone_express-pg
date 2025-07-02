const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get('/:id', Controller.getAccount)

module.exports = router