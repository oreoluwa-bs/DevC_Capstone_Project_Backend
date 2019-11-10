const express = require('express');
const auth = require('../middleware/auth');

const { getFeed } = require('../controllers/feed');


const router = express.Router();

router.get('/', auth, getFeed);

module.exports = router;
