/**
 * Utility functions for consistent API responses
 */
class ResponseUtil {
  /**
   * Success response
   */
  static success(res, data = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Error response
   */
  static error(res, message = 'Error occurred', statusCode = 500, error = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Not found response
   */
  static notFound(res, message = 'Resource not found') {
    return this.error(res, message, 404);
  }

  /**
   * Bad request response
   */
  static badRequest(res, message = 'Bad request', error = null) {
    return this.error(res, message, 400, error);
  }

  /**
   * Unauthorized response
   */
  static unauthorized(res, message = 'Unauthorized') {
    return this.error(res, message, 401);
  }

  /**
   * Forbidden response
   */
  static forbidden(res, message = 'Forbidden') {
    return this.error(res, message, 403);
  }

  /**
   * Created response
   */
  static created(res, data = null, message = 'Resource created successfully') {
    return this.success(res, data, message, 201);
  }
}

module.exports = ResponseUtil; 