const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  cloudninary_cloud_name: 'ocloudn',
  cloudninary_api_key: '178582552469755',
  cloudninary_api_secret: '_SRPd4Fo7fFqXBZ2IkuZz6cuaLo',
  decrypt_me: 'WHO_IS_KING_JIMMY',
  db_user: process.env.DB_USER || 'postgres',
  db_database: process.env.DB_DATABASE || 'teamwork_devcdb',
  db_password: process.env.DB_PASSWORD || 'moriatyjim',
  db_port: process.env.DB_PORT || 5432,
  port: 5000,
};
