import React, { useState, useEffect } from 'react';
import { fetchLogs } from './services/api';
import FilterBar from './components/FilterBar';
import LogList from './components/LogList';

export default function App() {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = {
          ...filters,
          timestamp_start: filters.timestamp_start && new Date(filters.timestamp_start).toISOString(),
          timestamp_end: filters.timestamp_end && new Date(filters.timestamp_end).toISOString()
        };
        const data = await fetchLogs(q);
        setLogs(data);
      } catch (err) {
        setError(err.message || 'Failed to load logs');
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Log System</h1>
        <FilterBar filters={filters} setFilters={setFilters} />
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Loading logs...</p>
          </div>
        ) : (
          <LogList logs={logs} />
        )}
      </div>
    </div>
  );
}