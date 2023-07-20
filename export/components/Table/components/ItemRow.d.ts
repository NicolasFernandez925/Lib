import { CSSProperties } from 'react';
import { Header } from '../Types';
interface PropsActionColumn {
    rowId: string;
    event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>;
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
export declare const ItemRow: <T extends {
    id: string;
}>(propsItemRow: PropsItemRow<T>) => import("react/jsx-runtime").JSX.Element;
export {};
