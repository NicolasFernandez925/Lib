import React, { CSSProperties, Dispatch, SetStateAction } from 'react';
import type { ActionRow, Filter, HeightValue } from './types';

// Esta interfaz se agregan los campos de la tabla (Ejemplo: Respuesta de un servicio)
export interface TableData {
  Pack: string;
  Descripción: string;
  Otorgado: string;
  Disponible: string;
  Vencimiento: string;
  'Renov.': string;
  'P. Plus': string;
  id: string;
  Action?: string;
  Selectable?: string;
}

export interface Header<T> {
  value: string;
  label: keyof T | ActionRow;
  tooltip?: (valueCol: any) => React.ReactNode;
  renderComponent?: (params: Render<T>) => JSX.Element;
  valueGetter?: (row: T) => string | React.ReactNode | number;
  ariaGetter?: (row: T) => string;
}

export interface Render<T> {
  row: T;
  rows: T[];
  rowIndex: number;
  id: string;
}

export interface TableProps<T> {
  headers: Header<T>[];
  data: T[];
  bordered: boolean;
  itemsPerPage?: number;
  showPagination?: boolean;
  alternateRowColor?: boolean;
  classHeaderGrid?: CSSProperties;
  classRowGrid?: CSSProperties;
  heigth?: HeightValue;
  footer?: React.ReactElement;
  filters?: Filter<T>[];
  classCell?: CSSProperties;
  selectableRows?: boolean;
  onSelectedRowsChange?: (rows: RowOnSelected<T>) => void;
  isLoading?: boolean;
  emptyState: EmptyState;
  triggerData: boolean;
}

interface EmptyState {
  title: string;
  description: string;
}

export interface RowOnSelected<T> {
  selectedRows: T[];
}

export interface PaginationResult<T> {
  currentItems: T[];
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
  currentPage: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  setCurrentItemsPerPage: Dispatch<SetStateAction<number>>;
  currentItemsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
