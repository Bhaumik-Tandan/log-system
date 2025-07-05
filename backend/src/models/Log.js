const database = require('../config/database');
const validator = require('../validators/logValidator');

class Log {
  constructor(data = {}) {
    this.level = data.level;
    this.message = data.message;
    this.resourceId = data.resourceId;
    this.timestamp = data.timestamp;
    this.traceId = data.traceId;
    this.spanId = data.spanId;
    this.commit = data.commit;
    this.metadata = data.metadata || {};
  }

  static async create(logData) {
    try {
      // Validate the log data
      validator.validateLogEntry(logData);
      
      // Create new log entry
      const log = new Log(logData);
      
      // Save to database
      const savedLog = await database.addLog(log);
      
      return savedLog;
    } catch (error) {
      throw new Error(`Failed to create log: ${error.message}`);
    }
  }

  static async findAll(filters = {}) {
    try {
      // Validate filters
      validator.validateFilters(filters);
      
      // Get logs from database
      const logs = await database.findLogs(filters);
      
      return logs;
    } catch (error) {
      throw new Error(`Failed to fetch logs: ${error.message}`);
    }
  }

  static async findByLevel(level) {
    return this.findAll({ level });
  }

  static async findByResourceId(resourceId) {
    return this.findAll({ resourceId });
  }

  static async findByTimeRange(startTime, endTime) {
    return this.findAll({ 
      timestamp_start: startTime, 
      timestamp_end: endTime 
    });
  }

  static async searchByMessage(message) {
    return this.findAll({ message });
  }

  toJSON() {
    return {
      level: this.level,
      message: this.message,
      resourceId: this.resourceId,
      timestamp: this.timestamp,
      traceId: this.traceId,
      spanId: this.spanId,
      commit: this.commit,
      metadata: this.metadata
    };
  }

  static getLevels() {
    return ['error', 'warn', 'info', 'debug'];
  }

  static getLevelColor(level) {
    const colors = {
      error: 'red',
      warn: 'yellow',
      info: 'blue',
      debug: 'gray'
    };
    return colors[level] || 'gray';
  }
}

module.exports = Log; 