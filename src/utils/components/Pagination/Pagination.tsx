import { FC } from "react";
import { useGlobalPaginationAppState, useGlobalPaginationAppDispatch } from "../../../app/context/pagination"; 

import { PaginationAppActions } from "../../../app/domain/types/app-pagination";

import './Pagination.css'

const Pagination: FC = () => {
  // tener un contexto para paginacion no veo que sea algo tan 'util, lo mejor ser'ia que sea un hook ya que es m'as reutilizable.
  const { currentPage, totalPages } = useGlobalPaginationAppState();
  const dispatch = useGlobalPaginationAppDispatch();

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch({ type: PaginationAppActions.PaginationCurrent, payload: currentPage - 1 });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch({ type: PaginationAppActions.PaginationCurrent, payload: currentPage + 1 });
    }
  };

  const handlePageClick = (page: number) => {
    dispatch({ type: PaginationAppActions.PaginationCurrent, payload: page });
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
