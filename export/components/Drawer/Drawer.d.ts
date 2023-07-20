import { CSSProperties, FC, ReactNode } from 'react';
import '../../styles/global-style.css';
import './Drawer.css';
interface DrawerProps {
    isOpen: boolean;
    width: number;
    position: 'left' | 'right';
    onClose: () => void;
    title?: string;
    subTitle?: string;
    classes?: CSSProperties;
    divide?: boolean;
    children: ReactNode;
    id: string;
}
export declare const Drawer: FC<DrawerProps>;
export {};
