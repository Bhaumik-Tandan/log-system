# Log System - Full Stack Assessment

A log ingestion and querying system built for a take-home assignment. This project demonstrates building a complete full-stack application with Node.js backend and React frontend.

## What this does

The system allows you to:
- Send log entries via API (POST /logs)
- View and filter logs through a web interface
- Search logs by message, level, resource, and time range
- See basic statistics about your logs

## Quick Start

### Backend
```bash
cd backend
yarn install
yarn start
```

### Frontend  
```bash
cd frontend
yarn install
yarn dev
```

The frontend and backend will start on their respective default ports.

## Project Structure

```
log-system/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── validators/
│   ├── data/
│   ├── package.json
│   ├── README.md
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   └── services/
│   ├── package.json
│   ├── README.md
│   └── ...
└── README.md
```

## API Endpoints

- `POST /logs` - Add a new log entry
- `GET /logs` - Get logs (supports filtering)
  - `GET /logs/levels` - Get available log levels
  - `GET /logs/stats` - Get log statistics

### Log Format
```json
{
  "level": "error|warn|info|debug",
  "message": "Log message here",
  "resourceId": "server-123",
  "timestamp": "2024-01-01T12:00:00Z",
  "traceId": "trace-123",
  "spanId": "span-456", 
  "commit": "abc123",
  "metadata": {}
}
```

### Filtering
You can filter logs by:
- `level` - Log level
- `message` - Search in message text
- `resourceId` - Filter by resource
- `timestamp_start` / `timestamp_end` - Time range

## Design Decisions

I chose to use a JSON file for storage as specified in the requirements. This keeps things simple and avoids external dependencies. The filtering logic is handled in memory using JavaScript array methods.

For the frontend, I went with React + Vite for fast development and Tailwind CSS for styling. The UI updates in real-time as you change filters.

## Known Issues

- No pagination for large datasets (would need it in production)
- No authentication (not required for this assignment)
- File-based storage has concurrency limitations

## Running Tests

```bash
# Backend tests
cd backend && yarn test
```


---