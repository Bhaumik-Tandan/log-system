import React from 'react';

export default function FilterBar({ filters, setFilters }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== '');

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filter Logs</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Message Search */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <input 
            id="message"
            name="message" 
            type="text"
            placeholder="Search in message..." 
            value={filters.message || ''} 
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Log Level */}
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
            Level
          </label>
          <select 
            id="level"
            name="level" 
            value={filters.level || ''} 
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Levels</option>
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>

        {/* Resource ID */}
        <div>
          <label htmlFor="resourceId" className="block text-sm font-medium text-gray-700 mb-1">
            Resource ID
          </label>
          <input 
            id="resourceId"
            name="resourceId" 
            type="text"
            placeholder="Filter by resource..." 
            value={filters.resourceId || ''} 
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="timestamp_start" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input 
            id="timestamp_start"
            type="datetime-local" 
            name="timestamp_start" 
            value={filters.timestamp_start || ''} 
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="timestamp_end" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input 
            id="timestamp_end"
            type="datetime-local" 
            name="timestamp_end" 
            value={filters.timestamp_end || ''} 
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value || value === '') return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {key}: {value}
                  <button
                    onClick={() => setFilters({ ...filters, [key]: '' })}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}