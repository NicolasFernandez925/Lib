import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useResizable } from '../../../export';

describe('useResizable', () => {
  test('should reset height when table container height is smaller than or equal to window height', () => {
    const tableContainerId = 'tableContainer';
    const { result } = renderHook(() => useResizable(tableContainerId));

    expect(result.current).toBeUndefined();

    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 400,
    });

    act(() => {
      window.innerHeight = 450;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBeUndefined();
  });
});
