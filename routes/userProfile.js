const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('/', ensureAuthenticated, Controller.getUserProfile)

router.get('/create', Controller.getCreateUserProfile)
router.post('/create', Controller.postCreateUserProfile)

router.get('/edituser', Controller.getEditUserProfile)
router.post('/edituser', Controller.postEditUserProfile)

module.exports = router