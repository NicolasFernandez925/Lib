import { CSSProperties, ReactElement } from "react";
export interface IProps {
    activeColor?: string;
    st?: CSSProperties;
    children: ReactElement[] | ReactElement;
    id: string;
    value: string;
}
