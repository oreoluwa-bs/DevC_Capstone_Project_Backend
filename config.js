const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  cloudninary_cloud_name: 'ocloudn',
  cloudninary_api_key: '178582552469755',
  cloudninary_api_secret: '_SRPd4Fo7fFqXBZ2IkuZz6cuaLo',
  decrypt_me: 'WHO_IS_KING_JIMMY',
  dbConnectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/teamwork_devcdb',
  port: process.env.PORT || 5000,
};
