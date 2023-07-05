import React, {
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
  CSSProperties,
} from 'react';
import { Render, TableData, TableProps, Filter } from './Types';
import { useResizable, usePagination, useKeyboardNavigation } from './hooks';
import { Pagination, ItemHeader, ItemRow } from './components';

import './styles.css';

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
    emptyState,
    triggerData,
  }: TableProps<T>,
  refTable: React.Ref<any>
) => {
  const [currentDataTable, setCurrentDataTable] = useState(data);
  const [isDescending, setIsDescending] = useState(false);
  const [columnSelected, setColumnSelected] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [allRowsSelected, setAllRowsSelected] = useState(false);

  const [label, setLabel] = useState('');

  const isDescendingRef = useRef<boolean | undefined>();
  const headerNameRef = useRef<string | undefined>();
  const eventTriggerType = useRef('click');
  const footerRef = useRef(null);
  const tableContainerRef = useRef(null);

  useKeyboardNavigation({
    tableContainerRef,
    headersSelector: '.table-header-cell',
    footerRef,
  });

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
    position: 'sticky',
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

  const actionColumn = ({
    rowId,
  }: {
    rowId: Render<TableData>['row']['id'];
  }) => {
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
      | React.KeyboardEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.FormEvent<HTMLDivElement>;
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
      {showPagination && triggerData && !isLoading && (
        <Pagination {...propsPagination} />
      )}

      {!isLoading && triggerData && (
        <div
          className="table"
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
                label,
                setLabel,
              };
              return <ItemRow key={row.id} {...propsItemRow} />;
            })}
            <div
              style={{ position: 'sticky', bottom: '0' }}
              ref={footerRef}
              tabIndex={0}
            >
              {footer}
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="loading" style={{ height: heigth }}>
          <h4>Cargando...</h4>
        </div>
      )}

      {!triggerData && (
        <div className="empty-state" style={{ height: heigth }}>
          <span>Icon</span>
          <p>{emptyState.title}</p>
          <p>{emptyState.description}</p>
        </div>
      )}
    </div>
  );
};

const TableWithForwardRef = React.forwardRef(Table) as <T extends unknown>(
  props: TableProps<T> & { ref?: React.Ref<any> }
) => React.ReactElement;

export default TableWithForwardRef;
