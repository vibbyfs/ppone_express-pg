const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')
const routerAuth = require('./auth')
const routerUserProfile = require('./userProfile')
const routerAccount = require('./account')
const routerTransaction = require('./transactions')

router.get('/', Controller.home)

router.use('/', routerAuth)
router.use('/userprofiles', routerUserProfile)
router.use('/accounts', routerAccount)
router.use('/transactions', routerTransaction)


module.exports = router