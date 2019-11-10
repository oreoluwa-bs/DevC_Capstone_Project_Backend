const jwt = require('jsonwebtoken');
const pool = require('./dbconnect');

const createArticle = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const articlePost = {
    id: req.body.id.trim(),
    title: req.body.title.trim(),
    article: req.body.article.trim(),
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

const editArticle = (req, res) => {
  const articlePost = {
    id: req.params.id,
    title: req.body.title,
    article: req.body.article,
  };

  const values = [
    articlePost.id,
    articlePost.title,
    articlePost.article,
  ];

  const queryOne = {
    text: 'SELECT * FROM articles WHERE id=$1;',
    values: [req.params.id],
  };

  pool.query(queryOne)
    .then((result) => {
      const token = req.headers.authorization.split(' ')[1];
      if (jwt.verify(token, 'WHO_IS_KING_JIMMY').userId === result.rows[0].authorId) {
        const query = {
          text: 'UPDATE articles SET title=$2, article=$3 WHERE id=$1;',
          values,
        };
        pool.query(query)
          .then(() => {
            res.status(200).json({
              status: 'success',
              data: {
                message: 'Article successfully updated',
                title: result.rows[0].title,
                article: result.rows[0].article,
              },
            });
          })
          .catch(() => {
            res.status(400).json({
              status: 'error',
              message: 'Article update failed',
            });
          });
      } else {
        res.status(400).json({
          status: 'error',
          message: 'Authenticated user cannot update article',
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        status: 'error',
        message: 'Article not found',
      });
    });
};

const deleteArticle = (req, res) => {
  const queryOne = {
    text: 'SELECT * FROM articles WHERE id=$1;',
    values: [req.params.id],
  };

  pool.query(queryOne)
    .then((result) => {
      const token = req.headers.authorization.split(' ')[1];
      if (jwt.verify(token, 'WHO_IS_KING_JIMMY').userId === result.rows[0].authorId) {
        const query = {
          text: 'DELETE FROM articles WHERE id=$1;',
          values: [req.params.id],
        };
        pool.query(query)
          .then(() => {
            res.status(200).json({
              status: 'success',
              data: {
                message: 'Article successfully deleted',
                title: result.rows[0].title,
                article: result.rows[0].article,
              },
            });
          })
          .catch((err) => {
            res.status(500).json({
              status: 'error',
              message: 'Article delete failed',
              result: err,
            });
          });
      } else {
        res.status(400).json({
          status: 'error',
          message: 'Authenticated user cannot delete article',
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        status: 'error',
        message: 'Article not found',
      });
    });
};

const getArticle = (req, res) => {
  let comments = [];
  const query = {
    text: 'SELECT * FROM articles WHERE id=$1;',
    values: [req.params.id],
  };
  const queryOne = {
    text: 'SELECT * FROM "commentsArticle" WHERE "articleId"=$1;',
    values: [req.params.id],
  };
  pool.query(queryOne)
    .then((resulte) => {
      comments = resulte.rows;
      pool.query(query)
        .then((result) => {
          res.status(200).json({
            status: 'success',
            data: {
              id: result.rows[0].id,
              createdOn: result.rows[0].createdOn,
              title: result.rows[0].title,
              article: result.rows[0].article,
              comments,
            },
          });
        })
        .catch(() => {
          res.status(400).json({
            status: 'error',
            message: 'Article post not found',
          });
        });
    });
};


const commentArticle = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const commentPost = {
    articleId: req.params.id,
    commentId: req.body.commentId,
    comment: req.body.comment.trim(),
    authorId: jwt.verify(token, 'WHO_IS_KING_JIMMY').userId,
    createdOn: Date.now(),
  };

  const values = [
    commentPost.commentId,
    commentPost.comment,
    commentPost.articleId,
    commentPost.authorId,
    commentPost.createdOn,
  ];

  pool.query('INSERT INTO "commentsArticle"(id, comment, "articleId", "authorId", "createdOn") VALUES($1, $2, $3, $4, $5);', values)
    .then(() => {
      res.status(200).json({
        status: 'success',
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'error',
        message: 'Could not post comment',
        m: err,
      });
    });
};

module.exports = {
  createArticle,
  editArticle,
  deleteArticle,
  getArticle,
  commentArticle,
};
