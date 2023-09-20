import React from 'react';

const FbiFilterForm = ({ filters, setFilters, applyFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <div className="col justify-content-center align-items-center" id="filtros">
      <form onSubmit={handleSubmit}>
        {['title', 'subject', 'nationality', 'sex', 'race'].map((field, index) => (
          <div key={index} className="col mb-3">
            <label className="form-label" htmlFor={`${field}-filter`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FbiFilterForm;
