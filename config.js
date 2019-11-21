const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  cloudninary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ocloudn',
  cloudninary_api_key: process.env.CLOUDINARY_API_KEY || '178582552469755',
  cloudninary_api_secret: process.env.CLOUDINARY_API_SECRET || '_SRPd4Fo7fFqXBZ2IkuZz6cuaLo',
  decrypt_me: 'WHO_IS_KING_JIMMY',
  dbConnectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/teamwork_devcdb',
  port: process.env.PORT || 5000,
  imagesLocation: `${__dirname}/images`,
};
