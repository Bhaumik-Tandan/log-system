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

  const getLevelIcon = (level) => {
    const icons = {
      error: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      warn: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      info: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      ),
      debug: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      )
    };
    return icons[level] || icons.debug;
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
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No logs found</h3>
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
            Showing {logs.length} of {logs.length} logs
          </div>
        </div>
      </div>

      {/* Log List */}
      <div className="divide-y divide-gray-200">
        {logs.map((log, index) => {
          const levelColor = getLevelColor(log.level);
          const levelIcon = getLevelIcon(log.level);
          
          return (
            <div 
              key={`${log.timestamp}-${index}`} 
              className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
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
                      {levelIcon}
                      <span className="ml-1">{log.level.toUpperCase()}</span>
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