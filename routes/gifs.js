const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const db = require('../controllers/gifs');

const router = express.Router();


router.get('/:id', auth, db.getGif);

router.post('/', auth, multer, db.postGif);

router.delete('/:id', auth, db.deleteGif);

router.post('/:id/comment', auth, db.commentGif);

module.exports = router;
