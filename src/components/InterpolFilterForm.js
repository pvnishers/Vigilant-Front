import React from 'react';

const InterpolFilterForm = ({ filters, setFilters, applyFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default InterpolFilterForm;
