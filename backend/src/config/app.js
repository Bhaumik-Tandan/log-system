import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
  },
  database: {
    path: process.env.DB_PATH || './data/logs.json'
  }
}; 