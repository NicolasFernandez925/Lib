import { act } from 'react-dom/test-utils';
import { usePagination } from '../../../export';
import { renderHook } from '@testing-library/react';

describe('usePagination', () => {
  it('returns correct pagination result', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const itemsPerPage = 4;

    const { result } = renderHook(() => usePagination(data, itemsPerPage));

    expect(result.current.currentItems).toEqual([1, 2, 3, 4]);
    expect(result.current.currentItemsPerPage).toBe(itemsPerPage);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.canGoPrevious).toBe(false);
    expect(result.current.canGoNext).toBe(true);

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.canGoPrevious).toBe(true);
    expect(result.current.canGoNext).toBe(true);

    act(() => {
      result.current.setCurrentItemsPerPage(3);
    });

    expect(result.current.currentItemsPerPage).toBe(3);
    expect(result.current.totalPages).toBe(4);
    expect(result.current.currentPage).toBe(2);
    expect(result.current.canGoPrevious).toBe(true);
    expect(result.current.canGoNext).toBe(true);
  });
});
