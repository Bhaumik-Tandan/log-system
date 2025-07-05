# Log System Backend API

A robust, scalable backend API for log management built with Node.js, Express, and following MVC architecture principles.

## 🏗️ Architecture

This backend follows the **Model-View-Controller (MVC)** pattern:

- **Models**: Handle data structure and business logic (`src/models/`)
- **Controllers**: Handle HTTP requests and responses (`src/controllers/`)
- **Routes**: Define API endpoints (`src/routes/`)
- **Middleware**: Handle cross-cutting concerns (`src/middleware/`)
- **Config**: Application configuration (`src/config/`)
- **Validators**: Input validation (`src/validators/`)
- **Utils**: Utility functions (`src/utils/`)

## 🚀 Features

- ✅ RESTful API design
- ✅ Input validation with AJV
- ✅ Comprehensive error handling
- ✅ Request logging with Morgan
- ✅ Security headers with Helmet
- ✅ CORS configuration
- ✅ Environment-based configuration
- ✅ Graceful shutdown handling
- ✅ Health check endpoint
- ✅ API documentation

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp env.example .env
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 📚 API Endpoints

### Logs
- `POST /api/logs` - Create a new log entry
- `GET /api/logs` - Get all logs with filters
- `GET /api/logs/levels` - Get available log levels
- `GET /api/logs/stats` - Get log statistics
- `GET /api/logs/search?q=query` - Search logs by message
- `GET /api/logs/level/:level` - Get logs by level
- `GET /api/logs/resource/:resourceId` - Get logs by resource ID

### System
- `GET /health` - Health check
- `GET /` - API information

## 📝 Log Entry Schema

```json
{
  "level": "error|warn|info|debug",
  "message": "string",
  "resourceId": "string",
  "timestamp": "ISO 8601 date-time",
  "traceId": "string",
  "spanId": "string",
  "commit": "string",
  "metadata": "object"
}
```

## 🔍 Query Parameters

- `level` - Filter by log level
- `message` - Search in message content
- `resourceId` - Filter by resource ID
- `timestamp_start` - Filter logs after this timestamp
- `timestamp_end` - Filter logs before this timestamp

## 🛡️ Security

- Helmet.js for security headers
- Input validation and sanitization
- CORS protection
- Error handling without exposing sensitive information

## 📊 Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🐛 Error Handling

Errors are handled globally and return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Configuration

Environment variables can be configured in `.env`:

- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origin
- `DB_PATH` - Database file path

## 📁 Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── models/          # Data models
├── routes/          # API routes
├── utils/           # Utility functions
├── validators/      # Input validation
└── app.js          # Main application file
```

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass

## 📄 License

ISC License 