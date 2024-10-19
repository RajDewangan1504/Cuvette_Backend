module.exports = {
    PORT: process.env.PORT || 3001,
    URL : "http://localhost:3001" || 3001,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/jobPlatform',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
};
