import React from 'react';
interface ITabListProps {
    handleClick: (value: string) => void;
    children: React.ReactElement[] | React.ReactElement;
    'aria-label': string;
}
export declare const List: ({ handleClick, children, ...rest }: ITabListProps) => import("react/jsx-runtime").JSX.Element;
export {};
