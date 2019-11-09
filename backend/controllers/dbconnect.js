const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  database: 'teamwork_devcdb',
  password: 'moriatyjim',
  port: 5432,
});

module.exports = pool;
