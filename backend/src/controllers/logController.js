const Log = require('../models/Log');

class LogController {
  /**
   * Create a new log entry
   * POST /api/logs
   */
  static async createLog(req, res) {
    try {
      const logData = req.body;
      
      // Create the log entry
      const newLog = await Log.create(logData);
      
      res.status(201).json({
        success: true,
        message: 'Log entry created successfully',
        data: newLog
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to create log entry',
        error: error.message
      });
    }
  }

  /**
   * Get all logs with optional filters
   * GET /api/logs
   */
  static async getLogs(req, res) {
    try {
      const filters = req.query;
      
      // Get logs from database
      const logs = await Log.findAll(filters);
      
      res.status(200).json({
        success: true,
        message: 'Logs retrieved successfully',
        data: logs,
        count: logs.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve logs',
        error: error.message
      });
    }
  }

  /**
   * Get logs by level
   * GET /api/logs/level/:level
   */
  static async getLogsByLevel(req, res) {
    try {
      const { level } = req.params;
      
      if (!Log.getLevels().includes(level)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid log level',
          error: `Level must be one of: ${Log.getLevels().join(', ')}`
        });
      }
      
      const logs = await Log.findByLevel(level);
      
      res.status(200).json({
        success: true,
        message: `Logs with level '${level}' retrieved successfully`,
        data: logs,
        count: logs.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve logs by level',
        error: error.message
      });
    }
  }

  /**
   * Get logs by resource ID
   * GET /api/logs/resource/:resourceId
   */
  static async getLogsByResource(req, res) {
    try {
      const { resourceId } = req.params;
      
      const logs = await Log.findByResourceId(resourceId);
      
      res.status(200).json({
        success: true,
        message: `Logs for resource '${resourceId}' retrieved successfully`,
        data: logs,
        count: logs.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve logs by resource',
        error: error.message
      });
    }
  }

  /**
   * Search logs by message
   * GET /api/logs/search
   */
  static async searchLogs(req, res) {
    try {
      const { q: query } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required',
          error: 'Please provide a search term'
        });
      }
      
      const logs = await Log.searchByMessage(query);
      
      res.status(200).json({
        success: true,
        message: `Search results for '${query}'`,
        data: logs,
        count: logs.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to search logs',
        error: error.message
      });
    }
  }

  /**
   * Get available log levels
   * GET /api/logs/levels
   */
  static async getLogLevels(req, res) {
    try {
      const levels = Log.getLevels();
      
      res.status(200).json({
        success: true,
        message: 'Log levels retrieved successfully',
        data: levels
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve log levels',
        error: error.message
      });
    }
  }

  /**
   * Get logs statistics
   * GET /api/logs/stats
   */
  static async getLogStats(req, res) {
    try {
      const allLogs = await Log.findAll();
      
      const stats = {
        total: allLogs.length,
        byLevel: {},
        byResource: {},
        recentActivity: allLogs.slice(0, 10) // Last 10 logs
      };
      
      // Count by level
      Log.getLevels().forEach(level => {
        stats.byLevel[level] = allLogs.filter(log => log.level === level).length;
      });
      
      // Count by resource
      allLogs.forEach(log => {
        stats.byResource[log.resourceId] = (stats.byResource[log.resourceId] || 0) + 1;
      });
      
      res.status(200).json({
        success: true,
        message: 'Log statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve log statistics',
        error: error.message
      });
    }
  }
}

module.exports = LogController; 