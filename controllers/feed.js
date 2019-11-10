const pool = require('./dbconnect');

const getFeed = (req, res) => {
  let gifFeed;
  let articleFeed;

  pool.query('SELECT * FROM articles')
    .then((result) => {
      articleFeed = result.rows;

      pool.query('SELECT * FROM gifs')
        .then((resulte) => {
          gifFeed = resulte.rows;

          res.status(200).json({
            status: 'success',
            data: [...articleFeed, ...gifFeed].sort((a, b) => a.createdOn - b.createdOn),
          });
        })
        .catch(() => {
          res.status(500).json({
            status: 'error',
            message: 'Server error',
          });
        });
    })
    .catch(() => {
      res.status(500).json({
        status: 'error',
        message: 'Server error',
      });
    });
};

module.exports = {
  getFeed,
};
