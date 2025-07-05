const fs = require('fs-extra');
const path = require('path');
const DB_PATH = path.join(__dirname, 'data', 'logs.json');

async function readLogs() {
  await fs.ensureFile(DB_PATH);
  const text = await fs.readFile(DB_PATH, 'utf8') || '[]';
  return JSON.parse(text);
}

async function writeLogs(logs) {
  await fs.writeFile(DB_PATH, JSON.stringify(logs, null, 2));
}

module.exports = { readLogs, writeLogs };