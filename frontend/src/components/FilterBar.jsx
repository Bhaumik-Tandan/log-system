import React from 'react';

export default function FilterBar({ filters, setFilters }) {
  const handle = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Logs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <input 
          name="message" 
          placeholder="Search message" 
          value={filters.message || ''} 
          onChange={handle}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select 
          name="level" 
          value={filters.level || ''} 
          onChange={handle}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Levels</option>
          {['error','warn','info','debug'].map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <input 
          name="resourceId" 
          placeholder="Resource ID" 
          value={filters.resourceId||''} 
          onChange={handle}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="datetime-local" 
          name="timestamp_start" 
          value={filters.timestamp_start||''} 
          onChange={handle}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="datetime-local" 
          name="timestamp_end" 
          value={filters.timestamp_end||''} 
          onChange={handle}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}