import { CSSProperties } from 'react';
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
  bordered: boolean;
  classCell: CSSProperties | undefined;
  data: T[];
  row: T;
  selectableRows: boolean | undefined;
  actionColumnChange: ({ rowId, event }: PropsActionColumn) => void;
  handleActionColumn: (rowId: string) => boolean;
  actionColumnKeyDown: ({ rowId, event }: PropsActionColumn) => void;
  label: any;
  setLabel: any;
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
    label,
    setLabel,
  } = propsItemRow;

  return (
    <div
      className={`table-row ${
        alternateRowColor && rowIndex % 2 === 0 ? 'alternate-row' : ''
      }
                     ${bordered && 'border-row'}
                   `}
      style={classRowGrid ?? defaultStyleTable}
      role="row"
      key={rowIndex}
    >
      {headers.map((header, columnIndex) => (
        <div
          onClick={
            header.label === 'Selectable' && selectableRows
              ? (event) => actionColumnChange({ rowId: row.id, event })
              : undefined
          }
          onKeyDown={
            header.label === 'Selectable' && selectableRows
              ? (event) => {
                  actionColumnKeyDown({ rowId: row.id, event });
                  setLabel(
                    handleActionColumn(row.id) ? 'Checked' : 'No checked'
                  );
                }
              : undefined
          }
          key={header.value}
          tabIndex={0}
          style={classCell && classCell}
          className={`table-cell ${bordered && 'border-cell'}`}
          role="cell"
          aria-labelledby={
            !(header.label === 'Selectable')
              ? `header-${columnIndex + 1} ${
                  !header.ariaGetter &&
                  `cell-${rowIndex + 1}-${columnIndex + 1}`
                } ariaGetter`
              : ''
          }
        >
          <p
            aria-hidden="true"
            id="ariaGetter"
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

            /*     <input
                          ref={inputRef}
                          style={{ cursor: "pointer" }}
                          type="checkbox"
                          checked={handleActionColumn(row.id)}
                          onChange={(event) => actionColumnChange({ rowId: row.id, event })}
                          onKeyDown={(event) =>
                            actionColumnKeyDown({ rowId: row.id, event })
                          }
                        /> 



                        <input
                type="checkbox"
                className="switch-input__checkbox"
                checked={handleActionColumn(row.id)}
                aria-label={"djdjdjdjffjfjfj"}
               
              />
          */
          )}
        </div>
      ))}
    </div>
  );
};
