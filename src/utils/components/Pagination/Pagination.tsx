import React from "react";

import { usePagination } from "../../../app/context/pagination";

import './Pagination.css'

const Pagination: React.FC = () => {
  const { currentPage, setCurrentPage, totalPages } = usePagination();

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination">
      <div id="pagination-container">
        <button disabled={currentPage === 1} onClick={handlePrevious}>
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          )
        )}
        <button disabled={currentPage === totalPages} onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
