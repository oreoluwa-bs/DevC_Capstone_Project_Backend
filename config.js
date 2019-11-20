const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  cloudninary_cloud_name: 'ocloudn',
  cloudninary_api_key: '178582552469755',
  cloudninary_api_secret: '_SRPd4Fo7fFqXBZ2IkuZz6cuaLo',
  decrypt_me: 'WHO_IS_KING_JIMMY',
  db_user: 'zoqmvalxterqmh',
  db_database: 'db8evnrv60k4k8',
  db_password: '6c4961dcbd0beb466450458ef9ae0e88f701468c0e0426ffbb1a7c7754622f48',
  db_port: process.env.DB_PORT || 5432,
  port: 5000,
};
