import { CSSProperties, FC } from 'react';
import '../../styles/global-style.css';
import './Spinner.css';
interface PropsSpinner {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md';
    styles?: CSSProperties;
}
export declare const Spinner: FC<PropsSpinner>;
export {};
