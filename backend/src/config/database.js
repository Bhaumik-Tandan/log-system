import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../data', 'logs.json');

async function ensureDataDirectory() {
  const dataDir = path.dirname(dbPath);
  await fs.ensureDir(dataDir);
}

async function readLogs() {
  try {
    await ensureDataDirectory();
    await fs.ensureFile(dbPath);
    const text = await fs.readFile(dbPath, 'utf8') || '[]';
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Failed to read logs: ${error.message}`);
  }
}

async function writeLogs(logs) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(logs, null, 2));
  } catch (error) {
    throw new Error(`Failed to write logs: ${error.message}`);
  }
}

async function addLog(logEntry) {
  try {
    const logs = await readLogs();
    logs.push(logEntry);
    await writeLogs(logs);
    return logEntry;
  } catch (error) {
    throw new Error(`Failed to add log: ${error.message}`);
  }
}

async function findLogs(filters = {}) {
  try {
    let logs = await readLogs();
    
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

export { addLog, findLogs }; 