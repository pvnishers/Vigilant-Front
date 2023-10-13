import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FbiFilterForm = ({ filters, setFilters, applyFilters }) => {
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 768);

  const initialFilters = {
    title: '',
    subject: '',
    nationality: '',
    race: '',
    sex: ''
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (filtersChanged) {
        applyFilters(debouncedFilters);
      }
    }, 1500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [debouncedFilters, applyFilters, filtersChanged]);

  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setDebouncedFilters((prevDebouncedFilters) => ({ ...prevDebouncedFilters, [name]: value }));
    setFiltersChanged(true);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setDebouncedFilters(initialFilters);
    setFiltersChanged(true);
  };

  return (
    <div className="mb-3 filters">
      <button 
        type="button" 
        className="btn btn-primary mb-3 d-md-none" 
        data-bs-toggle="collapse" 
        data-bs-target="#fbiFilterForm" 
        aria-expanded={isExpanded} 
        aria-controls="fbiFilterForm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FontAwesomeIcon icon={faFilter} />
      </button>
      <form className={isExpanded ? 'collapse show' : 'collapse'} id="fbiFilterForm">
        {['title', 'subject', 'nationality', 'race'].map((field, index) => (
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
        <div className="col mb-3">
          <label className="form-label">
            Sex
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="male-filter"
              name="sex"
              value="male"
              checked={filters.sex === 'male'}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="male-filter">Male</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="female-filter"
              name="sex"
              value="female"
              checked={filters.sex === 'female'}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="female-filter">Female</label>
          </div>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </form>
    </div>
  );
};

export default FbiFilterForm;
