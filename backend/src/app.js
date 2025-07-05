import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import config from './config/app.js';
import { logger, requestLogger } from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import logRoutes from './routes/logRoutes.js';

const app = express();

// Security and CORS
app.use(helmet());
app.use(cors(config.cors));

// Parse JSON
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Logging
app.use(logger);
app.use(requestLogger);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/logs', logRoutes);
app.use('/api/logs', logRoutes);

// API info
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Log System API',
    endpoints: {
      health: '/health',
      logs: '/api/logs',
      levels: '/api/logs/levels',
      stats: '/api/logs/stats'
    }
  });
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  process.exit(0);
});

export default app; 