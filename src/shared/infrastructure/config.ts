require('dotenv').config();

export const config = {
  server: {
    PORT: parseInt(process.env.PORT || '3000'),
  },
  database: {
    DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || 'root',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '27017'),
    DB_NAME: process.env.DB_NAME || 'news',
  },
};
