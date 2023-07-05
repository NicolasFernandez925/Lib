import { ReactElement, useContext } from "react";
import { ContextTab } from "./Tab";

interface ITabProps {
  disabled?: boolean;
  onClick?: () => void;
  label: string;
  icon?: ReactElement | string | null;
  "aria-controls"?: string;
  "aria-labelledby"?: string;
}

export const Item = ({ onClick, label, icon = null, ...rest }: ITabProps) => {
  const { tab, activeColor, st } = useContext(ContextTab);

  const activeBorderColor = {
    "--active-color": activeColor
  } as React.CSSProperties;

  const hasPropertyDisabled = "disabled" in { ...rest };

  const style = { ...st, ...activeBorderColor };

  const currentTabSelected = tab === label && !hasPropertyDisabled;

  return (
    <button
      role="tab"
      {...rest}
      style={style}
      className={`tab ${currentTabSelected ? "tab-list-active" : ""}`}
      onClick={onClick}
      aria-current={currentTabSelected}
      aria-selected={currentTabSelected}
      aria-disabled={hasPropertyDisabled}
    >
      {label}
      {icon}
    </button>
  );
};
