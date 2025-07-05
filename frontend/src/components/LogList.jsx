import React from 'react';

export default function LogList({ logs }) {
  const getLevelColor = (level) => {
    const colors = {
      error: 'red',
      warn: 'yellow',
      info: 'blue',
      debug: 'gray'
    };
    return colors[level] || 'gray';
  };

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (error) {
      return timestamp;
    }
  };

  const formatMetadata = (metadata) => {
    if (!metadata || typeof metadata !== 'object') return null;
    
    const entries = Object.entries(metadata);
    if (entries.length === 0) return null;
    
    return (
      <div className="mt-3 p-3 bg-gray-50 rounded-md">
        <div className="text-sm font-medium text-gray-700 mb-2">Metadata:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {entries.map(([key, value]) => (
            <div key={key} className="text-sm">
              <span className="font-medium text-gray-600">{key}:</span>
              <span className="ml-1 text-gray-800">
                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (logs.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-12 text-center">
        <h3 className="text-sm font-medium text-gray-900">No logs found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your filters or check if there are any logs in the system.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Log Entries ({logs.length})
          </h2>
          <div className="text-sm text-gray-500">
            Showing {logs.length} logs
          </div>
        </div>
      </div>

      {/* Log List */}
      <div className="divide-y divide-gray-200">
        {logs.map((log, index) => {
          const levelColor = getLevelColor(log.level);
          
          return (
            <div 
              key={`${log.timestamp}-${index}`} 
              className={`p-6 hover:bg-gray-50 transition-colors ${
                log.level === 'error' ? 'border-l-4 border-red-500 bg-red-50' :
                log.level === 'warn' ? 'border-l-4 border-yellow-500 bg-yellow-50' :
                log.level === 'info' ? 'border-l-4 border-blue-500 bg-blue-50' :
                'border-l-4 border-gray-500 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Header Row */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.level === 'error' ? 'bg-red-100 text-red-800' :
                      log.level === 'warn' ? 'bg-yellow-100 text-yellow-800' :
                      log.level === 'info' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.level.toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-500 font-mono">
                      {formatTimestamp(log.timestamp)}
                    </span>
                  </div>

                  {/* Message */}
                  <div className="text-gray-900 font-medium mb-3 leading-relaxed">
                    {log.message}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Resource:</span>
                      <span className="ml-1 font-mono text-gray-900">{log.resourceId}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Trace ID:</span>
                      <span className="ml-1 font-mono text-gray-900">{log.traceId}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Span ID:</span>
                      <span className="ml-1 font-mono text-gray-900">{log.spanId}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Commit:</span>
                      <span className="ml-1 font-mono text-gray-900">{log.commit}</span>
                    </div>
                  </div>

                  {/* Metadata */}
                  {formatMetadata(log.metadata)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
        <div className="text-sm text-gray-500 text-center">
          End of log entries • {logs.length} total logs
        </div>
      </div>
    </div>
  );
}