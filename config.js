const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  cloudninary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'sarleycl',
  cloudninary_api_key: process.env.CLOUDINARY_API_KEY || '394869428889474',
  cloudninary_api_secret: process.env.CLOUDINARY_API_SECRET || 'pKpKyhayqdC7DL6jZOm0k0wCpjo',
  decrypt_me: process.env.JWT_KEY || 'WHO_IS_KING_JIMMY',
  dbConnectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/teamwork_devcdb',
  port: process.env.PORT || 5000,
};
