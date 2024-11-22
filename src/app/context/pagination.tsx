import { createContext, useContext, useState, ReactNode } from "react";

import { Paginations } from "../domain/paginations";

const PaginationContext = createContext<Paginations | undefined>(
  undefined
);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const resetToFirstPage = () => setCurrentPage(1);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        resetToFirstPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};
