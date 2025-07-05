const fs = require('fs-extra');
const path = require('path');

class Database {
  constructor() {
    this.dbPath = path.join(__dirname, '../../data', 'logs.json');
    this.ensureDataDirectory();
  }

  async ensureDataDirectory() {
    const dataDir = path.dirname(this.dbPath);
    await fs.ensureDir(dataDir);
  }

  async readLogs() {
    try {
      await fs.ensureFile(this.dbPath);
      const text = await fs.readFile(this.dbPath, 'utf8') || '[]';
      return JSON.parse(text);
    } catch (error) {
      throw new Error(`Failed to read logs: ${error.message}`);
    }
  }

  async writeLogs(logs) {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify(logs, null, 2));
    } catch (error) {
      throw new Error(`Failed to write logs: ${error.message}`);
    }
  }

  async addLog(logEntry) {
    try {
      const logs = await this.readLogs();
      logs.push(logEntry);
      await this.writeLogs(logs);
      return logEntry;
    } catch (error) {
      throw new Error(`Failed to add log: ${error.message}`);
    }
  }

  async findLogs(filters = {}) {
    try {
      let logs = await this.readLogs();
      
      // Apply filters
      if (filters.level) {
        logs = logs.filter(log => log.level === filters.level);
      }
      
      if (filters.message) {
        const query = filters.message.toLowerCase();
        logs = logs.filter(log => 
          log.message.toLowerCase().includes(query)
        );
      }
      
      if (filters.resourceId) {
        logs = logs.filter(log => 
          log.resourceId.includes(filters.resourceId)
        );
      }
      
      if (filters.timestamp_start) {
        logs = logs.filter(log => log.timestamp >= filters.timestamp_start);
      }
      
      if (filters.timestamp_end) {
        logs = logs.filter(log => log.timestamp <= filters.timestamp_end);
      }

      // Sort by timestamp (newest first)
      logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      return logs;
    } catch (error) {
      throw new Error(`Failed to find logs: ${error.message}`);
    }
  }
}

module.exports = new Database(); 