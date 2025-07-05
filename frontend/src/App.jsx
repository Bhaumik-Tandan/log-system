import React, { useState, useEffect } from 'react';
import { logAPI } from './services/api';
import FilterBar from './components/FilterBar';
import LogList from './components/LogList';

export default function App() {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadLogs();
    loadStats();
  }, [filters]);

  const loadLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const q = {
        ...filters,
        timestamp_start: filters.timestamp_start && new Date(filters.timestamp_start).toISOString(),
        timestamp_end: filters.timestamp_end && new Date(filters.timestamp_end).toISOString()
      };
      const data = await logAPI.getLogs(q);
      setLogs(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load logs');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await logAPI.getLogStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    loadLogs();
    loadStats();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Log System</h1>
            <p className="text-gray-600 mt-1">View and filter your logs</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Logs</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">{stats.byLevel?.error || 0}</div>
              <div className="text-sm text-gray-600">Errors</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-yellow-600">{stats.byLevel?.warn || 0}</div>
              <div className="text-sm text-gray-600">Warnings</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{stats.byLevel?.info || 0}</div>
              <div className="text-sm text-gray-600">Info</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <FilterBar filters={filters} setFilters={handleFilterChange} />

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading logs...</p>
          </div>
        ) : (
          <LogList logs={logs} />
        )}
      </div>
    </div>
  );
}