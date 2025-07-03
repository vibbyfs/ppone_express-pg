const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');
const passport = require('../lib/passport');

router.get('/register', Controller.getRegister);
router.post('/register', Controller.postRegister);

router.get('/login', Controller.getLogin);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/accounts',
    failureRedirect: '/login',
}));

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));

router.get('/auth/google/accounts', passport.authenticate('google', {
    successRedirect: '/userprofiles/create',
    failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return res.send(err); }
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });
});


module.exports = router;
