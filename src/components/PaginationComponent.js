import React from 'react';
import ReactPaginate from 'react-paginate';

const PaginationComponent = ({ pageCount, onPageChange }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <ReactPaginate
          breakLabel={<a className="page-link">...</a>}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={onPageChange}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          activeClassName={'active'}
        />
      </ul>
    </nav>
  );
};

export default PaginationComponent;
