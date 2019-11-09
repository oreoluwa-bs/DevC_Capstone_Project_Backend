const jwt = require('jsonwebtoken');
const pool = require('./dbconnect');

const createArticle = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const articlePost = {
    id: req.body.id,
    title: req.body.title,
    article: req.body.article,
    authorId: jwt.verify(token, 'WHO_IS_KING_JIMMY').userId,
    createdOn: Date.now().toString(),
  };

  const values = [
    articlePost.id,
    articlePost.title,
    articlePost.article,
    articlePost.authorId,
    articlePost.createdOn,
  ];
  pool.query('INSERT INTO articles(id, title, article, "authorId", "createdOn") VALUES($1, $2, $3, $4, $5);', values)
    .then(() => {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: articlePost.id,
          createdOn: articlePost.createdOn,
          title: articlePost.title,
        },
      });
    })
    .catch(() => {
      res.status(400).json({
        status: 'error',
        message: 'Article post failed',
      });
    });
};


module.exports = {
  createArticle,
};
