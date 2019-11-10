const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('../routes/auth');
const gifRoutes = require('../routes/gifs');
const articleRoutes = require('../routes/articles');
const feedRoutes = require('../routes/feed');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/gifs', gifRoutes);

app.use('/api/v1/articles', articleRoutes);

app.use('/api/v1/feed', feedRoutes);

module.exports = { app };
