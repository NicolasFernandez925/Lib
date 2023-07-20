import React, {
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
  CSSProperties,
  Ref,
  KeyboardEvent,
  ChangeEvent,
  FormEvent,
} from 'react';
import { Render, TableProps, Filter } from './Types';
import { useResizable, usePagination } from './hooks';
import { Pagination, ItemHeader, ItemRow } from './components';
import '../../styles/global-style.css';
import './Table.css';

const Table = <T extends { id: string }>(
  {
    headers,
    data,
    classCell,
    bordered,
    filters,
    itemsPerPage = 10,
    showPagination = false,
    alternateRowColor,
    classHeaderGrid,
    classRowGrid,
    heigth,
    footer,
    selectableRows,
    onSelectedRowsChange,
    isLoading,
    triggerData,
    generateScroll,
    headerFixed,
    componentLoading,
    componentWithoutData,
    hoveredRow,
    clickeableRow,
  }: TableProps<T>,
  refTable: Ref<any>
) => {
  const [currentDataTable, setCurrentDataTable] = useState(data);
  const [isDescending, setIsDescending] = useState(false);
  const [columnSelected, setColumnSelected] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [allRowsSelected, setAllRowsSelected] = useState(false);

  const isDescendingRef = useRef<boolean | undefined>();
  const headerNameRef = useRef<string | undefined>();
  const eventTriggerType = useRef('click');
  const footerRef = useRef(null);
  const tableContainerRef = useRef<any>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentElement = event.target as HTMLElement;
      const tableContainer = tableContainerRef.current;
      const currentFooter = footerRef.current;

      if (!tableContainer) return;

      const tableBody = tableContainer.querySelector('.table-body');
      const headers = Array.from(
        tableContainer.querySelectorAll('.table-header-cell')
      );

      const currentRow = currentElement.parentElement;
      const currentCellIndex = Array.from(currentRow!.children).indexOf(
        currentElement
      );

      let nextElement: HTMLElement | undefined | null;

      if (event.key === 'ArrowUp') {
        const prevRow = currentRow!.previousElementSibling as HTMLElement;
        if (prevRow) {
          nextElement = prevRow.children[currentCellIndex] as HTMLElement;
        }
      } else if (event.key === 'ArrowDown') {
        const currentRowIndex = Array.from(tableBody!.children).indexOf(
          currentRow!
        );

        const nextRow = tableBody!.children[currentRowIndex + 1] as HTMLElement;

        if (nextRow) {
          nextElement = nextRow.children[currentCellIndex] as HTMLElement;
        }
      } else if (event.key === 'ArrowLeft') {
        const prevCell = currentRow!.children[
          currentCellIndex - 1
        ] as HTMLElement;
        if (prevCell) {
          nextElement = prevCell;
        }
      } else if (event.key === 'ArrowRight') {
        const nextCell = currentRow!.children[
          currentCellIndex + 1
        ] as HTMLElement;
        if (nextCell) {
          nextElement = nextCell;
        }
      }

      if (!nextElement) {
        if (event.key === 'ArrowUp') {
          if (currentElement === currentFooter) {
            const lastRow = tableBody!.lastElementChild as HTMLElement;
            if (lastRow) {
              const lastCellIndex = Array.from(lastRow.children).length - 1;
              nextElement = lastRow.children[lastCellIndex] as HTMLElement;
            }
          } else {
            nextElement = headers[currentCellIndex] as HTMLElement;
          }
        } else if (event.key === 'ArrowDown') {
          nextElement = currentFooter;
        }
      }

      if (nextElement) {
        nextElement.focus();
      }
    };

    const tableContainer = tableContainerRef.current;
    tableContainer?.addEventListener('keydown', handleKeyDown);

    return () => {
      tableContainer?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (onSelectedRowsChange) {
      const getSelectedData = (): T[] => {
        const selectedData: T[] = [];

        selectedRows.forEach((id) => {
          const selectedDatum = data.find((datum) => datum.id === id);
          if (selectedDatum) {
            selectedData.push(selectedDatum);
          }
        });

        return selectedData;
      };
      onSelectedRowsChange({ selectedRows: getSelectedData() });
    }
  }, [data, selectedRows, onSelectedRowsChange]);

  const {
    setCurrentItemsPerPage,
    currentItemsPerPage,
    currentItems,
    totalPages,
    handlePageChange,
    currentPage,
    canGoPrevious,
    canGoNext,
    setCurrentPage,
  } = usePagination<T>(currentDataTable, itemsPerPage);

  const defaultStyleTable: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
  };

  const styleHeader = Object.assign({}, classHeaderGrid ?? {}, {
    ...(headerFixed ? { position: 'sticky' } : {}),
    top: '0',
    zIndex: '2',
    backgroundColor: '#ffffff',
  });

  const dataTable = showPagination ? currentItems : currentDataTable;

  const tableHeight = useResizable('table-container');

  const resetValuesTable = () => {
    setCurrentPage(1);
    setSelectedRows([]);
    setAllRowsSelected(false);
    setCurrentItemsPerPage(itemsPerPage);
  };

  useImperativeHandle(refTable, () => ({
    resetTable: () => {
      resetValuesTable();
    },
  }));

  const handleFilter = (callbackFilter: any, headerName: string) => {
    if (
      headerNameRef.current !== undefined &&
      headerName !== headerNameRef.current
    ) {
      isDescendingRef.current = true;
      setIsDescending(false);
    } else {
      isDescendingRef.current = !isDescending;
    }

    headerNameRef.current = headerName;
    setColumnSelected(headerName);

    setIsDescending((prevValue) => !prevValue);

    const result = callbackFilter(data, headerName);

    if (!isDescendingRef.current) {
      setCurrentDataTable(data);
    } else {
      setCurrentDataTable(result);
    }
  };

  const handleHeaderSort = (callbackFilter: any, event: any) => {
    eventTriggerType.current = event.type;

    const headerName = event.target.dataset.value;

    if (
      eventTriggerType.current === 'click' ||
      (event.key === 'Enter' && eventTriggerType.current === 'keydown')
    ) {
      event.preventDefault();
      handleFilter(callbackFilter, headerName);
    }
  };

  const actionColumn = ({ rowId }: { rowId: Render<T>['row']['id'] }) => {
    setAllRowsSelected(false);
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((row: string) => row !== rowId)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]);
    }
  };

  const handleEventAction = ({
    rowId,
    event,
  }: {
    rowId: string;
    event:
      | KeyboardEvent<HTMLInputElement>
      | ChangeEvent<HTMLInputElement>
      | FormEvent<HTMLDivElement>;
  }) => {
    event.preventDefault();
    if (!('key' in event)) {
      actionColumn({ rowId });
    } else if ('key' in event && event.key === 'Enter') {
      actionColumn({ rowId });
    }
  };

  const handleActionColumn = (rowId: string): boolean => {
    return selectedRows.includes(rowId);
  };

  const selectedAllRows = () => {
    if (allRowsSelected) {
      setSelectedRows([]);
    } else {
      const allRowIds = data.map((row) => row.id);
      setSelectedRows(allRowIds);
    }

    setAllRowsSelected((prevValue) => !prevValue);
  };

  const handleOnkeyDownSelectedAllRows = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      selectedAllRows();
    }
  };

  const handleChangeSelectAllRows = () => {
    selectedAllRows();
  };

  const propsPagination = {
    setCurrentPage,
    setCurrentItemsPerPage,
    canGoPrevious,
    handlePageChange,
    currentPage,
    totalPages,
    canGoNext,
    currentItemsPerPage,
  };

  return (
    <div
      ref={tableContainerRef}
      id="table-container"
      className="table-container"
    >
      {showPagination &&
        ((!isLoading && triggerData) || triggerData === undefined) && (
          <Pagination {...propsPagination} />
        )}

      {((!isLoading && triggerData) || triggerData === undefined) && (
        <div
          className={`table ${generateScroll ? 'table-scroll' : ''}`}
          role="table"
          aria-label="Tabla de datos"
          style={
            heigth
              ? { height: heigth, overflowY: tableHeight ? 'scroll' : 'unset' }
              : { height: '100%' }
          }
        >
          <div
            className={`table-row table-header ${bordered && 'border-header'}`}
            style={classHeaderGrid ? styleHeader : defaultStyleTable}
          >
            {headers.map((header, index) => {
              const findFilter = filters?.find(
                (value: Filter<T>) => value.column === header.label
              );

              const propsItemHeader = {
                isDescending,
                bordered,
                selectableRows,
                allRowsSelected,
                columnSelected,
                handleChangeSelectAllRows,
                handleOnkeyDownSelectedAllRows,
                handleOnKeyDownSort: handleHeaderSort,
                handleFilterOnClick: handleHeaderSort,
                index,
                header,
                findFilter,
                classCell,
              };

              return <ItemHeader<T> key={header.value} {...propsItemHeader} />;
            })}
          </div>
          <div className="table-body">
            {dataTable.map((row, rowIndex) => {
              const propsItemRow = {
                actionColumnKeyDown: handleEventAction,
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
                actionColumnChange: handleEventAction,
                hoveredRow,
                clickeableRow,
              };
              return <ItemRow key={row.id} {...propsItemRow} />;
            })}
          </div>
          {footer && footer}
        </div>
      )}
      {isLoading && (
        <div className="loading" style={{ height: heigth }}>
          {componentLoading}
        </div>
      )}

      {triggerData !== undefined && !triggerData && !isLoading && (
        <div className="empty-state" style={{ height: heigth }}>
          {componentWithoutData}
        </div>
      )}
    </div>
  );
};

const TableWithForwardRef = React.forwardRef(Table) as <T extends unknown>(
  props: TableProps<T> & { ref?: React.Ref<any> }
) => React.ReactElement;

export default TableWithForwardRef;
