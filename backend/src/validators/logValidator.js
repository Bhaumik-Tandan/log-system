import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const logSchema = {
  type: 'object',
  required: ['level', 'message', 'resourceId', 'timestamp', 'traceId', 'spanId', 'commit', 'metadata'],
  properties: {
    level: { enum: ['error', 'warn', 'info', 'debug'] },
    message: { type: 'string', minLength: 1 },
    resourceId: { type: 'string', minLength: 1 },
    timestamp: { type: 'string', format: 'date-time' },
    traceId: { type: 'string', minLength: 1 },
    spanId: { type: 'string', minLength: 1 },
    commit: { type: 'string', minLength: 1 },
    metadata: { type: 'object' }
  },
  additionalProperties: false
};

const validateLog = ajv.compile(logSchema);

function validateLogEntry(data) {
  const valid = validateLog(data);
  if (!valid) {
    throw new Error(`Invalid log data: ${JSON.stringify(validateLog.errors)}`);
  }
  return true;
}

function validateFilters(filters) {
  if (filters.level && !['error', 'warn', 'info', 'debug'].includes(filters.level)) {
    throw new Error('Invalid log level');
  }
  
  if (filters.timestamp_start && !isValidDate(filters.timestamp_start)) {
    throw new Error('Invalid start timestamp');
  }
  
  if (filters.timestamp_end && !isValidDate(filters.timestamp_end)) {
    throw new Error('Invalid end timestamp');
  }
  
  return filters;
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

export { validateLogEntry, validateFilters }; 