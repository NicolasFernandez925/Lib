import React, { CSSProperties } from 'react';
import '../../styles/global-style.css';
import './Select.css';
interface SelectOption {
    value: string;
    label: string;
}
type onChangeProps = {
    value: string;
    name: string;
};
type onErrorChangeProps = {
    error: boolean;
    name: string;
};
interface SelectInputProps {
    options: SelectOption[];
    value: string;
    onChange: ({ value, name }: onChangeProps) => void;
    error?: string;
    label?: string;
    placeHolder?: string;
    styles?: CSSProperties;
    messageRequiredField?: string;
    disabled?: boolean;
    name: string;
    onErrorChange: ({ error, name }: onErrorChangeProps) => void;
}
export declare const Select: React.FC<SelectInputProps>;
export {};
