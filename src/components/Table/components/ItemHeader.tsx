import { CSSProperties } from 'react';
import { Header } from '../Types';
import { Filter } from '../';

interface PropsHeader<T> {
  index: number;
  header: Header<T>;
  classCell?: CSSProperties;
  findFilter: Filter<T> | undefined;
  isDescending: boolean;
  bordered: boolean | undefined;
  selectableRows: boolean | undefined;
  allRowsSelected: boolean;
  columnSelected: string;
  handleChangeSelectAllRows: () => void;
  handleOnkeyDownSelectedAllRows: (event: React.KeyboardEvent) => void;
  handleOnKeyDownSort: (fn: any, event: any) => void;
  handleFilterOnClick: (fn: any, event: any) => void;
}

export const ItemHeader = <T extends unknown>(props: PropsHeader<T>) => {
  const {
    header,
    findFilter,
    isDescending,
    bordered,
    index,
    selectableRows,
    allRowsSelected,
    columnSelected,
    handleChangeSelectAllRows,
    handleOnkeyDownSelectedAllRows,
    handleOnKeyDownSort,
    handleFilterOnClick,
    classCell,
  } = props;

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (findFilter) {
      handleOnKeyDownSort(findFilter.filter, event);
    } else if (header.label === 'Selectable') {
      handleOnkeyDownSelectedAllRows(event);
    }
  };

  return (
    <div
      tabIndex={0}
      key={index}
      data-value={header.label}
      aria-live={findFilter ? 'assertive' : 'off'}
      className={`table-cell table-header-cell ${bordered && 'border-cell'}`}
      style={{ cursor: findFilter ? 'pointer' : 'unset', ...classCell }}
      aria-label={
        findFilter
          ? `Ordenar la columna ${String(header.label)} de forma ${
              isDescending ? 'descendente' : 'ascendente'
            }`
          : ''
      }
      onKeyDown={handleOnKeyDown}
      onClick={
        findFilter
          ? (event) => handleFilterOnClick(findFilter?.filter, event)
          : undefined
      }
    >
      <div aria-label={`Columna ${header.value}`} id={`header-${index + 1}`}>
        {header.label !== 'Action' && !(header.label === 'Selectable') ? (
          <span data-value={header.label}>
            {header.tooltip
              ? header.tooltip(String(header.label))
              : header.value}
          </span>
        ) : header.label === 'Selectable' && selectableRows ? (
          <input
            style={{
              cursor: 'pointer',
              textDecoration: allRowsSelected ? 'line-through' : 'none',
            }}
            type="checkbox"
            checked={allRowsSelected}
            onChange={handleChangeSelectAllRows}
            onKeyDown={handleOnkeyDownSelectedAllRows}
          />
        ) : (
          ''
        )}
      </div>

      {findFilter && (
        <button
          data-value={header.label}
          tabIndex={-1}
          className={`arrow_filter ${
            isDescending && columnSelected === header.label ? 'arrow_up' : ''
          }`}
          aria-label={
            findFilter
              ? `Ordenar la columna ${String(header.label)} de forma ${
                  isDescending ? 'descendente' : 'ascendente'
                }`
              : ''
          }
        >
          ↓
        </button>
      )}
    </div>
  );
};
