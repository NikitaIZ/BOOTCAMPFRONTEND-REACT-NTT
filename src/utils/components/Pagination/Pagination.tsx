import React from "react";
import { useGlobalPaginationAppState, useGlobalPaginationAppDispatch } from "../../../app/context/pagination"; // Usamos el nuevo hook para obtener el contexto

import './Pagination.css'
import { PaginationAppActions } from "../../../app/domain/app-pagination";

const Pagination: React.FC = () => {
  const { currentPage, totalPages } = useGlobalPaginationAppState(); // Accedemos al estado
  const dispatch = useGlobalPaginationAppDispatch(); // Accedemos al dispatch

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch({ type: PaginationAppActions.PaginationCurrent, payload: currentPage - 1 }); // Reducir la página actual
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch({ type: PaginationAppActions.PaginationCurrent, payload: currentPage + 1 }); // Incrementar la página actual
    }
  };

  const handlePageClick = (page: number) => {
    dispatch({ type: PaginationAppActions.PaginationCurrent, payload: page }); // Establecer la página seleccionada
  };

  return (
    <div className="pagination">
      <div id="pagination-container">
        <button disabled={currentPage === 1} onClick={handlePrevious}>
          &lt;
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageClick(page)} 
          >
            {page}
          </button>
        ))}
        
        <button disabled={currentPage === totalPages} onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
