import { addLog, findLogs } from '../config/database.js';
import { validateLogEntry, validateFilters } from '../validators/logValidator.js';

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
      validateLogEntry(logData);
      const log = new Log(logData);
      const savedLog = await addLog(log);
      return savedLog;
    } catch (error) {
      throw new Error(`Failed to create log: ${error.message}`);
    }
  }

  static async findAll(filters = {}) {
    try {
      validateFilters(filters);
      const logs = await findLogs(filters);
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

export default Log; 