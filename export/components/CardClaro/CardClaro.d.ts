import { CSSProperties, FC, KeyboardEvent, ReactElement } from 'react';
import '../../styles/global-style.css';
import './CardClaro.css';
interface CardClaroProps {
    icon: ReactElement;
    title: string;
    styles?: CSSProperties;
    onClick?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}
export declare const CardClaro: FC<CardClaroProps>;
export {};
