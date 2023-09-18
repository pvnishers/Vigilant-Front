import React from 'react';

const FilterForm = ({ nameFilter, setNameFilter }) => {
  return (
    <div className="col-md-2 justify-content-center align-items-center" id="filtros">
      <form>
        <div className="col-md-10 mb-3">
          <label className="form-label" htmlFor="name-filter">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name-filter"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div className="col-md-10 mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
