const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./dbconnect');


const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        gender: req.body.gender,
        jobrole: req.body.jobrole,
        department: req.body.department,
        address: req.body.address,
      };
      const values = [
        user.id,
        user.firstname,
        user.lastname,
        user.email,
        user.password,
        user.gender,
        user.jobrole,
        user.department,
        user.address,
      ];

      pool.query('INSERT INTO users(id, firstname, lastname, email, password, gender, jobrole, department, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', values)
        .then(() => {
          const token = jwt.sign(
            { userId: user.id },
            'WHO_IS_KING_JIMMY',
            { expiresIn: '24h' },
          );
          res.status(200).json({
            status: 'success',
            data: {
              message: 'User account successfully created',
              token,
              userId: user.id,
            },
          });
        })
        .catch(() => {
          res.json({
            status: 'error',
            message: 'User account could not be created',
          });
        });
    });
};

const signinUser = (req, res) => {
  
};


module.exports = {
  createUser,
  signinUser,
};
