const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  user: config.db_user,
  database: config.db_database,
  password: config.db_password,
  port: config.db_port,
});

module.exports = pool;
