import { PaginationResult } from '../Types';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

export const Pagination = (
  pagination: Omit<PaginationResult<unknown>, 'currentItems'>
) => {
  const {
    setCurrentPage,
    setCurrentItemsPerPage,
    canGoPrevious,
    handlePageChange,
    currentPage,
    totalPages,
    canGoNext,
    currentItemsPerPage,
  } = pagination;

  return (
    <div className="container_pagination">
      <div className="pagination">
        <button
          className="pagination-button"
          disabled={!canGoPrevious}
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Página anterior"
        >
          <Icon path={mdiChevronLeft} size={1} />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            className={`pagination-button item ${
              currentPage === index + 1 ? 'page_selected' : ''
            }`}
            key={index}
            onClick={() => handlePageChange(index + 1)}
            aria-label={`Ir a la página ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-button"
          disabled={!canGoNext}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Página siguiente"
        >
          <Icon path={mdiChevronRight} size={1} />
        </button>
      </div>
      <div className="total_result">
        <span className="show_per_page body-2">Mostrar</span>
        <select
          className="select_per_page"
          value={currentItemsPerPage}
          onChange={(event) => {
            setCurrentPage(1);
            setCurrentItemsPerPage(Number(event.target.value));
          }}
        >
          <option className="body-2" value={10}>
            10
          </option>
          <option className="body-2" value={15}>
            15
          </option>
          <option className="body-2" value={20}>
            20
          </option>
          <option className="body-2" value={30}>
            30
          </option>
          <option className="body-2" value={50}>
            50
          </option>
        </select>
        <span className="result_per_page body-2">resultados</span>
      </div>
    </div>
  );
};
