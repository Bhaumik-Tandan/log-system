import React from 'react';

export default function LogList({ logs }) {
  if (logs.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-8 text-center">
        <p className="text-gray-500 text-lg">No logs found</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Log Entries ({logs.length})</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {logs.map((log, i) => (
          <div key={i} className={`p-6 hover:bg-gray-50 transition-colors ${
            log.level === 'error' ? 'border-l-4 border-red-500 bg-red-50' :
            log.level === 'warn' ? 'border-l-4 border-yellow-500 bg-yellow-50' :
            log.level === 'info' ? 'border-l-4 border-blue-500 bg-blue-50' :
            'border-l-4 border-gray-500 bg-gray-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    log.level === 'error' ? 'bg-red-100 text-red-800' :
                    log.level === 'warn' ? 'bg-yellow-100 text-yellow-800' :
                    log.level === 'info' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="text-gray-900 font-medium mb-2">{log.message}</div>
                <div className="text-sm text-gray-600 space-x-4">
                  <span>Resource: {log.resourceId}</span>
                  <span>Trace: {log.traceId}</span>
                  <span>Span: {log.spanId}</span>
                  <span>Commit: {log.commit}</span>
                </div>
                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <strong>Metadata:</strong> {JSON.stringify(log.metadata)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}