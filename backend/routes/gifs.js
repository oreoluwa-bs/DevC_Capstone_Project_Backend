const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const db = require('../controllers/gifs');

const router = express.Router();

router.get('/:id', auth, db.getGif);




module.exports = router;
