export interface Paginations {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  resetToFirstPage: () => void;
}
