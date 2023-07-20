import { CSSProperties, FC, ReactNode } from 'react';
import '../../styles/global-style.css';
import './Tooltip.css';
type TooltipProps = {
    position: 'left' | 'right' | 'top' | 'bottom';
    content: string;
    children: ReactNode;
    classNames?: CSSProperties;
};
export declare const Tooltip: FC<TooltipProps>;
export {};
