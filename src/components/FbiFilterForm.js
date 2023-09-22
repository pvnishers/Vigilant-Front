import React, { useState, useEffect } from 'react';

const FbiFilterForm = ({ filters, setFilters, applyFilters }) => {
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
    <div className="col justify-content-center align-items-center" id="filtros">
      <form>
        {['title', 'subject', 'nationality', 'sex', 'race'].map((field, index) => (
          <div key={index} className="col mb-3">
            <label className="form-label" htmlFor={`${field}-filter`}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              className="form-control"
              id={`${field}-filter`}
              name={field}
              value={filters[field]}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default FbiFilterForm;
