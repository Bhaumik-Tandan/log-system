# Log System - Professional Log Management Platform

A complete, production-ready log management system built with modern technologies and following professional software engineering practices.

## 🏗️ Architecture Overview

This project follows a **clean, scalable architecture** with proper separation of concerns:

```
log-system/
├── backend/           # Node.js/Express API with MVC architecture
│   ├── src/
│   │   ├── config/    # Configuration management
│   │   ├── controllers/ # Request handlers
│   │   ├── models/    # Data models and business logic
│   │   ├── routes/    # API route definitions
│   │   ├── middleware/ # Express middleware
│   │   ├── validators/ # Input validation
│   │   └── utils/     # Utility functions
│   └── data/         # JSON-based data storage
└── frontend/         # React application with modern UI/UX
    ├── src/
    │   ├── components/ # React components
    │   ├── services/  # API integration
    │   └── styles/    # CSS and styling
    └── public/        # Static assets
```

## 🚀 Features

### Backend API
- ✅ **RESTful API** with proper HTTP status codes
- ✅ **MVC Architecture** for clean code organization
- ✅ **Input Validation** with AJV schemas
- ✅ **Error Handling** with global error middleware
- ✅ **Request Logging** with Morgan
- ✅ **Security Headers** with Helmet
- ✅ **CORS Configuration** for cross-origin requests
- ✅ **Environment Configuration** with dotenv
- ✅ **Health Check Endpoints** for monitoring
- ✅ **Comprehensive API Documentation**

### Frontend Application
- ✅ **Modern React 18** with hooks and functional components
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **Real-time Filtering** with multiple criteria
- ✅ **Professional UI/UX** with loading states and error handling
- ✅ **Statistics Dashboard** showing log analytics
- ✅ **Advanced Search** capabilities
- ✅ **Clean Component Architecture**

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **AJV** - JSON schema validation
- **Morgan** - HTTP request logger
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **fs-extra** - Enhanced file system operations

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **ESLint** - Code linting

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp env.example .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000

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

## 🎯 Key Features

### Advanced Filtering
- Real-time search across multiple fields
- Date range filtering
- Log level filtering
- Resource-based filtering
- Active filter indicators

### Professional UI/UX
- Clean, modern interface
- Responsive design for all devices
- Loading states and error handling
- Color-coded log levels with icons
- Structured data display

### Monitoring & Analytics
- Real-time statistics dashboard
- Log count by level
- Resource usage tracking
- Recent activity monitoring

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm test            # Run tests
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables
2. Run `npm run build` (if applicable)
3. Start with `npm start`
4. Use PM2 or similar for production

### Frontend Deployment
1. Run `npm run build`
2. Deploy `dist/` folder to your hosting service
3. Configure environment variables for API endpoints

## 🛡️ Security Features

- Input validation and sanitization
- Security headers with Helmet
- CORS protection
- Error handling without exposing sensitive information
- Rate limiting ready (can be easily added)

## 📊 Performance

- Efficient JSON-based storage
- Optimized React rendering
- Lazy loading ready
- Minimal bundle size
- Fast API responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Add tests for new features
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
1. Check the documentation in each directory
2. Review the API endpoints at `/` when the backend is running
3. Check the browser console for frontend errors
4. Review the server logs for backend issues

---

**Built with ❤️ using modern web technologies** 