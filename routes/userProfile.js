const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();


router.get('/create', Controller.getCreateUserProfile)
router.post('/create', Controller.postCreateUserProfile)

// router.get('/:id', Controller.getUserProfileById)

// router.get('/edit-profile/:id', Controller.getEditUserProfile)
// router.post('/edit-profile/:id', Controller.postEditUserProfile)

// router.get('/delete-profile/:id', Controller.getDeleteUserProfile)

module.exports = router