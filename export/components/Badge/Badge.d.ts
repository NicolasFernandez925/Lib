import React, { FC } from 'react';
import '../../styles/global-style.css';
import './Badge.css';
interface PropsBadge {
    variant?: 'success' | 'danger' | 'info';
    styles?: React.CSSProperties;
    text: string;
    onClick?: () => void;
}
export declare const Badge: FC<PropsBadge>;
export {};
