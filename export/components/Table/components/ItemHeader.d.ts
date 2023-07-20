import React, { CSSProperties } from 'react';
import { Filter, Header } from '../Types';
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
export declare const ItemHeader: <T extends unknown>(props: PropsHeader<T>) => import("react/jsx-runtime").JSX.Element;
export {};
