const morgan = require('morgan');

/**
 * Custom logging format
 */
const logFormat = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    '-',
    new Date().toISOString()
  ].join(' ');
};

/**
 * Create logger middleware
 */
const logger = morgan(logFormat, {
  stream: {
    write: (message) => {
      console.log(message.trim());
    }
  }
});

/**
 * Custom request logger for additional logging
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = { logger, requestLogger }; 