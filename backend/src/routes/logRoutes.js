const express = require('express');
const LogController = require('../controllers/logController');

const router = express.Router();

/**
 * @route   POST /api/logs
 * @desc    Create a new log entry
 * @access  Public
 */
router.post('/', LogController.createLog);

/**
 * @route   GET /api/logs
 * @desc    Get all logs with optional filters
 * @access  Public
 */
router.get('/', LogController.getLogs);

/**
 * @route   GET /api/logs/levels
 * @desc    Get available log levels
 * @access  Public
 */
router.get('/levels', LogController.getLogLevels);

/**
 * @route   GET /api/logs/stats
 * @desc    Get log statistics
 * @access  Public
 */
router.get('/stats', LogController.getLogStats);

/**
 * @route   GET /api/logs/search
 * @desc    Search logs by message
 * @access  Public
 */
router.get('/search', LogController.searchLogs);

/**
 * @route   GET /api/logs/level/:level
 * @desc    Get logs by specific level
 * @access  Public
 */
router.get('/level/:level', LogController.getLogsByLevel);

/**
 * @route   GET /api/logs/resource/:resourceId
 * @desc    Get logs by resource ID
 * @access  Public
 */
router.get('/resource/:resourceId', LogController.getLogsByResource);

module.exports = router; 