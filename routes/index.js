const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')
const passport = require('../lib/passport')


router.get('/', Controller.home)

router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)

router.get('/login', Controller.getLogin)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}))

router.get('/dashboard', Controller.getDashboard)

module.exports = router