import { useState } from 'react';
import { PaginationResult } from '../Types';

export const usePagination = <T extends unknown>(
  data: T[],
  itemsPerPage: number
): PaginationResult<T> => {
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / currentItemsPerPage);
  const indexOfLastItem = currentPage * currentItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - currentItemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentItems,
    setCurrentItemsPerPage,
    currentItemsPerPage,
    totalPages,
    handlePageChange,
    currentPage,
    canGoPrevious,
    canGoNext,
    setCurrentPage,
  };
};
