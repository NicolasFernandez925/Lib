import { ButtonHTMLAttributes, CSSProperties, FC, ReactNode } from 'react';
import '../../styles/global-style.css';
import './Button.css';
type Icon = {
    style?: CSSProperties;
    component: ReactNode | string;
};
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary';
    text?: string;
    icon?: Icon;
    singleIcon?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    classes?: CSSProperties;
}
export declare const Button: FC<ButtonProps>;
export {};
