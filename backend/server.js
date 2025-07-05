const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { readLogs, writeLogs } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// JSON schema
const schema = {
  type: 'object',
  required: ['level','message','resourceId','timestamp','traceId','spanId','commit','metadata'],
  properties: {
    level: { enum: ['error','warn','info','debug'] },
    message: { type: 'string' },
    resourceId: { type: 'string' },
    timestamp: { type: 'string', format: 'date-time' },
    traceId: { type: 'string' },
    spanId: { type: 'string' },
    commit: { type: 'string' },
    metadata: { type: 'object' }
  }
};
const ajv = new Ajv();
addFormats(ajv); // Add support for formats like 'date-time'
const validate = ajv.compile(schema);

// POST /logs
app.post('/logs', async (req, res) => {
  const valid = validate(req.body);
  if (!valid) return res.status(400).json({ error: validate.errors });
  try {
    const logs = await readLogs();
    logs.push(req.body);
    await writeLogs(logs);
    res.status(201).json(req.body);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /logs with filters
app.get('/logs', async (req, res) => {
  try {
    let logs = await readLogs();
    // apply filters
    const { level, message, resourceId, timestamp_start, timestamp_end } = req.query;
    if (level) logs = logs.filter(l => l.level === level);
    if (message) {
      const q = message.toLowerCase();
      logs = logs.filter(l => l.message.toLowerCase().includes(q));
    }
    if (resourceId) logs = logs.filter(l => l.resourceId.includes(resourceId));
    if (timestamp_start) logs = logs.filter(l => l.timestamp >= timestamp_start);
    if (timestamp_end) logs = logs.filter(l => l.timestamp <= timestamp_end);
    // reverse chronological
    logs.sort((a,b) => b.timestamp.localeCompare(a.timestamp));
    res.json(logs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));