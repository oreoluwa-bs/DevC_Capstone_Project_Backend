const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.decrypt_me);
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      res.json({
        status: 'error',
        message: 'Invalid user ID',
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(200).json({
      status: 'error',
      message: 'User not authenticated',
    });
  }
};
