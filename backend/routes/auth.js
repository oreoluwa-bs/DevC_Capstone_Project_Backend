const express = require('express');
const db = require('../controllers/auth');

const router = express.Router();


router.post('/create-user', db.createUser);


module.exports = router;
