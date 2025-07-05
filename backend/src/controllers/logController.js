import Log from '../models/Log.js';

class LogController {
  static async createLog(req, res) {
    try {
      const logData = req.body;
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

  static async getLogs(req, res) {
    try {
      const filters = req.query;
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

  static async getLogStats(req, res) {
    try {
      const allLogs = await Log.findAll();
      
      const stats = {
        total: allLogs.length,
        byLevel: {},
        byResource: {},
        recentActivity: allLogs.slice(0, 10)
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

export default LogController; 