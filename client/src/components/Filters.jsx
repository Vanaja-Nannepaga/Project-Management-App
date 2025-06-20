import React, { useState } from 'react';

export default function Filters({ onFilter, loading }) {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignee: '',
    search: ''
  });

  const handleApply = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = { status: '', priority: '', assignee: '', search: '' };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div
      className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 mb-6"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 3px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h3 style={{ marginBottom: '1rem', color: '#333', fontSize: '1.25rem', fontWeight: '600' }}>
        Filter Tickets
      </h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Status Filter */}
        <div style={{ minWidth: '150px', flex: '1 1 150px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
          >
            <option value="">All</option>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div style={{ minWidth: '150px', flex: '1 1 150px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Assignee Filter */}
        <div style={{ minWidth: '180px', flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Assignee</label>
          <input
            type="text"
            placeholder="Assignee ID or Email"
            value={filters.assignee}
            onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
          />
        </div>

        {/* Search Filter */}
        <div style={{ flex: '2 1 300px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Search</label>
          <input
            type="text"
            placeholder="Search tickets..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%'
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ alignSelf: 'flex-end', display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleReset}
            disabled={loading}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            disabled={loading}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: loading ? '#7aa3e8' : '#4a86e8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Applying...' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
}

