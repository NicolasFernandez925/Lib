import { CSSProperties } from 'react';
import { IProps } from './Types';
interface InitialState {
    tab: string;
    activeColor?: string;
    st?: CSSProperties;
}
export declare const ContextTab: import("react").Context<InitialState>;
export declare const Tab: ({ children, value, activeColor, st, }: Omit<IProps, 'id'>) => import("react/jsx-runtime").JSX.Element;
export {};
