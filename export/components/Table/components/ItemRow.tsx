import { CSSProperties, useState } from 'react';
import { Header } from '../Types';

interface PropsActionColumn {
  rowId: string;
  event:
    | React.KeyboardEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLInputElement>
    | React.FormEvent<HTMLDivElement>;
}

interface PropsItemRow<T> {
  headers: Header<T>[];
  alternateRowColor: boolean | undefined;
  rowIndex: number;
  classRowGrid: CSSProperties | undefined;
  defaultStyleTable: CSSProperties;
  bordered?: boolean;
  classCell: CSSProperties | undefined;
  data: T[];
  row: T;
  clickeableRow?: (row: T) => void | undefined;
  selectableRows: boolean | undefined;
  actionColumnChange: ({ rowId, event }: PropsActionColumn) => void;
  handleActionColumn: (rowId: string) => boolean;
  actionColumnKeyDown: ({ rowId, event }: PropsActionColumn) => void;
  hoveredRow?: boolean;
}

export const ItemRow = <T extends { id: string }>(
  propsItemRow: PropsItemRow<T>
) => {
  const {
    actionColumnKeyDown,
    handleActionColumn,
    alternateRowColor,
    rowIndex,
    row,
    classRowGrid,
    defaultStyleTable,
    bordered,
    classCell,
    data,
    headers,
    selectableRows,
    actionColumnChange,
    hoveredRow,
    clickeableRow,
  } = propsItemRow;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const stylesRow = {
    ...(classRowGrid ?? defaultStyleTable),
    border: isHovered ? '2px solid #0097a9' : '',
  };

  return (
    <div
      onClick={clickeableRow ? () => clickeableRow(row) : undefined}
      className={`table-row ${
        alternateRowColor && rowIndex % 2 === 0 ? 'alternate-row' : ''
      } ${bordered && 'border-row'} ${clickeableRow ? 'clickeable-row' : ''}`}
      style={stylesRow}
      role="row"
      key={rowIndex}
    >
      {headers.map((header, columnIndex) => (
        <div
          {...(hoveredRow
            ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
            : {})}
          onClick={
            header.label === 'Selectable' && selectableRows
              ? (event) => actionColumnChange({ rowId: row.id, event })
              : undefined
          }
          onKeyDown={
            header.label === 'Selectable' && selectableRows
              ? (event) => {
                  actionColumnKeyDown({ rowId: row.id, event });
                }
              : undefined
          }
          key={header.value}
          tabIndex={0}
          style={classCell && classCell}
          className={`table-cell body-3 ${bordered && 'border-cell'}`}
          role="cell"
          aria-labelledby={
            !(header.label === 'Selectable')
              ? `header-${columnIndex + 1} ${
                  !header.ariaGetter
                    ? `cell-${rowIndex + 1}-${columnIndex + 1}`
                    : `ariaGetter-${rowIndex + 1}-${columnIndex + 1}`
                }`
              : ''
          }
        >
          <p
            aria-hidden="true"
            id={`ariaGetter-${rowIndex + 1}-${columnIndex + 1}`}
            style={{
              position: 'absolute',
              left: '-9999px',
              visibility: 'hidden',
            }}
          >
            {header.ariaGetter && header.ariaGetter(row)}
          </p>
          <span id={`cell-${rowIndex + 1}-${columnIndex + 1}`}>
            {header.valueGetter
              ? header.valueGetter(row)
              : (row as any)[header.label]}
          </span>
          {header.renderComponent && header.label === 'Action' && (
            <div className="action-column">
              {header.renderComponent({
                row,
                rows: data,
                rowIndex,
                id: row.id,
              })}
            </div>
          )}
          {header.label === 'Selectable' && selectableRows && (
            <div
              className={`switch-input ${
                handleActionColumn(row.id) ? 'switch-input--checked' : ''
              }`}
            >
              <span className="switch-input__slider"></span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
