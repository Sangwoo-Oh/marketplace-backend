const dotenv = require('dotenv');
dotenv.config();

const config = {
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    URI: process.env.URI,
    JWT_SECRET: process.env.JWT_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION
}

module.exports = config;
