const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./dbconnect');
const helpers = require('../helpers');
const config = require('../config');


const createUser = (req, res) => {
  bcrypt.hash(req.body.password.trim(), 10)
    .then((hash) => {
      const user = {
        id: helpers.uuidNum(),
        firstname: req.body.firstname.trim(),
        lastname: req.body.lastname.trim(),
        email: req.body.email.trim(),
        password: hash,
        gender: req.body.gender.trim(),
        jobrole: req.body.jobrole.trim(),
        department: req.body.department.trim(),
        address: req.body.address.trim(),
        createdOn: Date.now(),
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
        user.createdOn,
      ];

      pool.query('INSERT INTO users(id, firstname, lastname, email, password, gender, jobrole, department, address, "createdOn") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', values)
        .then(() => {
          const token = jwt.sign(
            { userId: user.id },
            config.decrypt_me,
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
          res.status(200).json({
            status: 'error',
            message: 'User account could not be created',
          });
        });
    });
};

const signinUser = (req, res) => {
  const user = {
    email: req.body.email.trim(),
    password: req.body.password.trim(),
  };

  const values = [
    user.email,
  ];

  pool.query('SELECT id, email, password from users WHERE email = $1', values)
    // eslint-disable-next-line consistent-return
    .then((result) => {
      bcrypt.compare(req.body.password, result.rows[0].password)
        // eslint-disable-next-line consistent-return
        .then((valid) => {
          if (!valid) {
            return res.status(200).json({
              status: 'error',
              message: 'Incorrect password or email address. Try again!',
            });
          }
          const token = jwt.sign(
            { userId: result.rows[0].id },
            config.decrypt_me,
            { expiresIn: '24h' },
          );
          res.status(200).json({
            status: 'success',
            data: {
              token,
              userId: result.rows[0].id,
            },
          });
        })
        .catch(() => {
          res.status(500).json({
            status: 'error',
            message: 'User account signin failed',
          });
        });
    })
    .catch(() => {
      res.status(200).json({
        status: 'error',
        message: 'Incorrect password or email address!',
      });
    });
};


module.exports = {
  createUser,
  signinUser,
};
