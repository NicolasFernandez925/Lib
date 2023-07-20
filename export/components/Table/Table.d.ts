import React, { Ref } from 'react';
import { TableProps } from './Types';
import '../../styles/global-style.css';
import './Table.css';
declare const TableWithForwardRef: <T extends unknown>(props: TableProps<T> & {
    ref?: React.Ref<any> | undefined;
}) => React.ReactElement;
export default TableWithForwardRef;
