# Backend API

Express.js API for log management.

## Setup

```bash
yarn install
yarn start
```

## API

- `POST /logs` - Add log entry
- `GET /logs` - Get logs (with filters)
- `GET /logs/levels` - Get log levels
- `GET /logs/stats` - Get statistics

## Log Format

```json
{
  "level": "error|warn|info|debug",
  "message": "Log message",
  "resourceId": "server-123",
  "timestamp": "2024-01-01T12:00:00Z",
  "traceId": "trace-123",
  "spanId": "span-456",
  "commit": "abc123",
  "metadata": {}
}
```

## Filters

- `level` - Log level
- `message` - Search in message
- `resourceId` - Filter by resource
- `timestamp_start` / `timestamp_end` - Time range

## Data Storage

Uses JSON file storage as required. Data is stored in `data/logs.json`. 