const express = require('express');
const db = require('../controllers/auth');

const router = express.Router();


router.post('/create-user', db.createUser);

router.post('/signin', db.signinUser);

module.exports = router;
