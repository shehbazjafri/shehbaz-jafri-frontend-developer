'use client';

import { useState } from 'react';

const CapsuleSearchForm = ({ onSubmit }) => {
  const [filters, setFilters] = useState({
    status: '',
    original_launch: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Status:
        <input
          type="text"
          name="status"
          value={filters.status}
          onChange={handleChange}
        />
      </label>
      <label>
        Original Launch:
        <input
          type="text"
          name="original_launch"
          value={filters.original_launch}
          onChange={handleChange}
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={filters.type}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default CapsuleSearchForm;
