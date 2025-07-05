import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';
import logRoutes from '../src/routes/logRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/logs', logRoutes);

describe('Log Controller', () => {
  describe('POST /api/logs', () => {
    it('should create a new log entry', async () => {
      const logData = {
        level: 'info',
        message: 'Test log message from test',
        resourceId: 'test-server',
        timestamp: '2024-01-01T12:00:00Z',
        traceId: 'trace-123',
        spanId: 'span-456',
        commit: 'abc123',
        metadata: { userId: 'user1' }
      };

      const response = await request(app)
        .post('/api/logs')
        .send(logData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('level');
      expect(response.body.data.level).toBe('info');
      expect(response.body.data.message).toBe('Test log message from test');
    });

    it('should return 400 for invalid log data', async () => {
      const invalidLog = {
        level: 'invalid-level',
        message: ''
      };

      const response = await request(app)
        .post('/api/logs')
        .send(invalidLog)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/logs', () => {
    it('should return logs', async () => {
      const response = await request(app)
        .get('/api/logs')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should filter logs by level', async () => {
      const response = await request(app)
        .get('/api/logs?level=error')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      // Should only return error logs
      response.body.data.forEach(log => {
        expect(log.level).toBe('error');
      });
    });
  });

  describe('GET /api/logs/levels', () => {
    it('should return available log levels', async () => {
      const response = await request(app)
        .get('/api/logs/levels')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(['error', 'warn', 'info', 'debug']);
    });
  });

  describe('GET /api/logs/stats', () => {
    it('should return log statistics', async () => {
      const response = await request(app)
        .get('/api/logs/stats')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('byLevel');
      expect(typeof response.body.data.total).toBe('number');
      expect(response.body.data.total).toBeGreaterThan(0);
    });
  });
}); 