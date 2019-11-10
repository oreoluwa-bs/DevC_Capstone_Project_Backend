const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const pool = require('./dbconnect');


cloudinary.config({
  cloud_name: 'ocloudn',
  api_key: '178582552469755',
  api_secret: '_SRPd4Fo7fFqXBZ2IkuZz6cuaLo',
});

const postGif = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const gifPost = {
    id: req.body.id,
    title: req.body.title,
    authorId: jwt.verify(token, 'WHO_IS_KING_JIMMY').userId,
    createdOn: Date.now(),
  };
  cloudinary.uploader.upload(`../backend/images/${req.file.filename}`)
    .then((result) => {
      const values = [
        gifPost.id,
        gifPost.title,
        result.secure_url,
        gifPost.authorId,
        gifPost.createdOn,
      ];
      pool.query('INSERT INTO gifs(id, title, "imageUrl", "authorId", "createdOn") VALUES($1, $2, $3, $4, $5);', values)
        .then(() => {
          res.status(200).json({
            status: 'success',
            data: {
              gifId: gifPost.id,
              message: 'GIF image successfully posted',
              createdOn: gifPost.createdOn,
              title: gifPost.title,
              imageUrl: result.secure_url,
            },
          });
        })
        .catch(() => {
          res.status(500).json({
            status: 'error',
            message: 'GIF image post failed',
          });
        });
    })
    .catch(() => {
      res.status(400).json({
        status: 'error',
        message: 'GIF image post failed',
      });
    });
};

const deleteGif = (req, res) => {
  const queryOne = {
    text: 'SELECT * FROM gifs WHERE id=$1;',
    values: [req.params.id],
  };

  pool.query(queryOne)
    .then((result) => {
      const token = req.headers.authorization.split(' ')[1];
      if (jwt.verify(token, 'WHO_IS_KING_JIMMY').userId === result.rows[0].authorId) {
        const query = {
          text: 'DELETE FROM gifs WHERE id=$1;',
          values: [req.params.id],
        };
        pool.query(query)
          .then(() => {
            res.status(200).json({
              status: 'success',
              data: {
                message: 'Gif post successfully deleted',
              },
            });
          })
          .catch(() => {
            res.status(500).json({
              status: 'error',
              message: 'Gif delete failed',
            });
          });
      }
    })
    .catch(() => {
      res.status(400).json({
        status: 'error',
        message: 'Gif not found',
      });
    });
};


const getGif = (req, res) => {
  let comments = [];
  const query = {
    text: 'SELECT * FROM gifs WHERE id=$1;',
    values: [req.params.id],
  };
  const queryOne = {
    text: 'SELECT * FROM "commentsGif" WHERE "gifId"=$1;',
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
              url: result.rows[0].imageUrl,
              comments,
            },
          });
        })
        .catch(() => {
          res.status(400).json({
            status: 'error',
            message: 'Gif post not found',
          });
        });
    });
};

const commentGif = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const commentPost = {
    gifId: req.params.id,
    commentId: req.body.commentId,
    comment: req.body.comment,
    authorId: jwt.verify(token, 'WHO_IS_KING_JIMMY').userId,
    createdOn: Date.now(),
  };

  const values = [
    commentPost.commentId,
    commentPost.comment,
    commentPost.gifId,
    commentPost.authorId,
    commentPost.createdOn,
  ];

  pool.query('INSERT INTO "commentsGif"(id, comment, "gifId", "authorId", "createdOn") VALUES($1, $2, $3, $4, $5);', values)
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
  postGif,
  deleteGif,
  getGif,
  commentGif,
};
