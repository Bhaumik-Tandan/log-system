const Ajv = require('ajv');
const addFormats = require('ajv-formats');

class LogValidator {
  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    addFormats(this.ajv);
    this.setupSchemas();
  }

  setupSchemas() {
    this.logSchema = {
      type: 'object',
      required: ['level', 'message', 'resourceId', 'timestamp', 'traceId', 'spanId', 'commit', 'metadata'],
      properties: {
        level: { 
          enum: ['error', 'warn', 'info', 'debug'],
          description: 'Log level must be one of: error, warn, info, debug'
        },
        message: { 
          type: 'string',
          minLength: 1,
          description: 'Log message is required and cannot be empty'
        },
        resourceId: { 
          type: 'string',
          minLength: 1,
          description: 'Resource ID is required'
        },
        timestamp: { 
          type: 'string', 
          format: 'date-time',
          description: 'Timestamp must be a valid ISO date-time string'
        },
        traceId: { 
          type: 'string',
          minLength: 1,
          description: 'Trace ID is required'
        },
        spanId: { 
          type: 'string',
          minLength: 1,
          description: 'Span ID is required'
        },
        commit: { 
          type: 'string',
          minLength: 1,
          description: 'Commit hash is required'
        },
        metadata: { 
          type: 'object',
          description: 'Metadata must be an object'
        }
      },
      additionalProperties: false
    };

    this.validateLog = this.ajv.compile(this.logSchema);
  }

  validateLogEntry(data) {
    const valid = this.validateLog(data);
    
    if (!valid) {
      const errors = this.validateLog.errors.map(error => ({
        field: error.instancePath || error.schemaPath,
        message: error.message,
        value: error.data
      }));
      
      throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
    }
    
    return true;
  }

  validateFilters(filters) {
    const validFilters = {};
    
    if (filters.level && !['error', 'warn', 'info', 'debug'].includes(filters.level)) {
      throw new Error('Invalid log level filter');
    }
    
    if (filters.timestamp_start && !this.isValidDate(filters.timestamp_start)) {
      throw new Error('Invalid start timestamp format');
    }
    
    if (filters.timestamp_end && !this.isValidDate(filters.timestamp_end)) {
      throw new Error('Invalid end timestamp format');
    }
    
    return validFilters;
  }

  isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }
}

module.exports = new LogValidator(); 