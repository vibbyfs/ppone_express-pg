const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get('/', Controller.getAccount)

router.get('/topup', Controller.getTopUp)
router.get('/topup', Controller.getTopUp)

router.get('/withdraw', Controller.getWithdraw)
router.post('/withdraw', Controller.postWithdraw)

router.get('/:id', Controller.getAccount)

module.exports = router