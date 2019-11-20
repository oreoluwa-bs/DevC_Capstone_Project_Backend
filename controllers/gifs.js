const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const pool = require('./dbconnect');
const helpers = require('../helpers');
const config = require('../config');


cloudinary.config({
  cloud_name: config.cloudninary_cloud_name,
  api_key: config.cloudninary_api_secret,
  api_secret: config.cloudninary_api_secret,
});

const postGif = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const gifPost = {
    id: helpers.uuidNum(),
    title: req.body.title.trim(),
    authorId: jwt.verify(token, config.decrypt_me).userId,
    createdOn: Date.now(),
  };
  cloudinary.uploader.upload(`${config.imagesLocation}/${req.file.filename}`)
    .then((result) => {
      const values = [
        gifPost.id,
        gifPost.title,
        result.secure_url,
        gifPost.authorId,
        gifPost.createdOn,
      ];
      pool.query('SELECT * FROM users WHERE id = $1', [gifPost.authorId])
        .then((resulted) => {
          pool.query('INSERT INTO gifs(id, title, "imageUrl", "authorId", "createdOn", "authorName") VALUES($1, $2, $3, $4, $5, $6);', [...values, `${resulted.rows[0].firstname} ${resulted.rows[0].lastname}`])
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
          res.status(200).json({
            status: 'error',
            message: 'Post could not be created',
          });
        });
    })
    .catch((err) => {
      console.log(err);
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
      if (jwt.verify(token, config.decrypt_me).userId === result.rows[0].authorId) {
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
    commentId: helpers.uuidNum(),
    comment: req.body.comment.trim(),
    authorId: jwt.verify(token, config.decrypt_me).userId,
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
    .catch(() => {
      res.status(400).json({
        status: 'error',
        message: 'Could not post comment',
      });
    });
};

module.exports = {
  postGif,
  deleteGif,
  getGif,
  commentGif,
};
