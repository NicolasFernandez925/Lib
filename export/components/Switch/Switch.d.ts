import { CSSProperties, FC } from 'react';
import '../../styles/global-style.css';
import './Switch.css';
interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    styles?: CSSProperties;
}
export declare const Switch: FC<SwitchProps>;
export {};
