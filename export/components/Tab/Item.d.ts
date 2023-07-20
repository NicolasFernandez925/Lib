import { ReactElement } from 'react';
interface ITabProps {
    disabled?: boolean;
    onClick?: () => void;
    label: string;
    icon?: ReactElement | string | null;
    'aria-controls'?: string;
    'aria-labelledby'?: string;
}
export declare const Item: ({ onClick, label, icon, ...rest }: ITabProps) => import("react/jsx-runtime").JSX.Element;
export {};
