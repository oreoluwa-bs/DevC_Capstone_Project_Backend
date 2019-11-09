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

module.exports = {
  postGif,
};