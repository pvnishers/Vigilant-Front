import React, { useState, useEffect } from 'react';

const InterpolFilterForm = ({ filters, setFilters, applyFilters }) => {
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [filtersChanged, setFiltersChanged] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (filtersChanged) {
        applyFilters(debouncedFilters);
      }
    }, 1500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [debouncedFilters, applyFilters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setDebouncedFilters((prevDebouncedFilters) => ({ ...prevDebouncedFilters, [name]: value }));
    setFiltersChanged(true);
  };


  return (
    <form>
      <div className="mb-3">
        <label htmlFor="nameForename-filter" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="nameForename-filter"
          name="nameForename"
          value={filters.nameForename}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="nationality-filter" className="form-label">Nationality</label>
        <input
          type="text"
          className="form-control"
          id="nationality-filter"
          name="nationality"
          value={filters.nationality}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default InterpolFilterForm;
