const express = require('express');

const auth = require('../middleware/auth');

const db = require('../controllers/articles');

const router = express.Router();

router.post('/', auth, db.createArticle);

router.patch('/:id', auth, db.editArticle);



module.exports = router;
