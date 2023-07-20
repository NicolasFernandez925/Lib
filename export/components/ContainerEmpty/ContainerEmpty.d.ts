import { CSSProperties, FC, ReactElement } from 'react';
import '../../styles/global-style.css';
import './ContainerEmpty.css';
interface PropsContainerEmpty {
    title: string;
    description?: string;
    icon?: ReactElement;
    styles?: CSSProperties;
    border?: boolean;
}
export declare const ContainerEmpty: FC<PropsContainerEmpty>;
export {};
