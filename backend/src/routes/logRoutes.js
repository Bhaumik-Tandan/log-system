import express from 'express';
import LogController from '../controllers/logController.js';

const router = express.Router();

// Create log
router.post('/', LogController.createLog);

// Get logs with filters
router.get('/', LogController.getLogs);

// Get log levels
router.get('/levels', LogController.getLogLevels);

// Get stats
router.get('/stats', LogController.getLogStats);

// Search logs
router.get('/search', LogController.searchLogs);

// Get by level
router.get('/level/:level', LogController.getLogsByLevel);

// Get by resource
router.get('/resource/:resourceId', LogController.getLogsByResource);

export default router; 