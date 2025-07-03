const express = require('express');
const Controller = require('../controllers/controller');
const { Root } = require('postcss');
const router = express.Router();

router.get('/', Controller.getTransaction)

module.exports = router