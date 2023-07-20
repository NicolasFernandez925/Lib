import React from 'react';
import '../../styles/global-style.css';
import './Alert.css';
interface AlertHandle {
    addAlert: (message: string, description?: string) => void;
}
type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
type Variant = 'error' | 'info' | 'success' | 'alert';
type AlertProps = {
    position?: Position;
    variant?: Variant;
    styles?: React.CSSProperties;
};
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<AlertHandle>>;
export {};
