const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')
const passport = require('../lib/passport')


router.get('/', Controller.home)

router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}))
router.get('/auth/google/dashboard', passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}))

router.get('/login', Controller.getLogin)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}))

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) res.send(err);
        res.redirect('/')
    })
})

router.get('/dashboard', Controller.getDashboard)

module.exports = router