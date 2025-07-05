import { jest } from '@jest/globals';
import { validateLogEntryForTest } from '../src/validators/logValidator.js';

describe('Log Validator', () => {
  describe('validateLogEntry', () => {
    const requiredFields = {
      traceId: 'trace-123',
      spanId: 'span-456',
      commit: 'abc123',
      metadata: { userId: 'user1' }
    };

    it('should validate a correct log entry', () => {
      const validLog = {
        level: 'info',
        message: 'Test message',
        resourceId: 'server-123',
        timestamp: '2024-01-01T12:00:00Z',
        ...requiredFields
      };

      const result = validateLogEntryForTest(validLog);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid log level', () => {
      const invalidLog = {
        level: 'invalid',
        message: 'Test message',
        resourceId: 'server-123',
        timestamp: '2024-01-01T12:00:00Z',
        ...requiredFields
      };

      const result = validateLogEntryForTest(invalidLog);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('allowed values'))).toBe(true);
    });

    it('should reject empty message', () => {
      const invalidLog = {
        level: 'info',
        message: '',
        resourceId: 'server-123',
        timestamp: '2024-01-01T12:00:00Z',
        ...requiredFields
      };

      const result = validateLogEntryForTest(invalidLog);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('fewer than 1 characters'))).toBe(true);
    });

    it('should reject invalid timestamp format', () => {
      const invalidLog = {
        level: 'info',
        message: 'Test message',
        resourceId: 'server-123',
        timestamp: 'invalid-date',
        ...requiredFields
      };

      const result = validateLogEntryForTest(invalidLog);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('format'))).toBe(true);
    });

    it('should accept logs with minimal valid fields', () => {
      const minimalLog = {
        level: 'info',
        message: 'Test message',
        resourceId: 'server-123',
        timestamp: '2024-01-01T12:00:00Z',
        ...requiredFields
      };

      const result = validateLogEntryForTest(minimalLog);
      expect(result.isValid).toBe(true);
    });
  });
}); 