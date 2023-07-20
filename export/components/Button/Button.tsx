import { ButtonHTMLAttributes, CSSProperties, FC, ReactNode } from 'react';
import '../../styles/global-style.css';
import './Button.css';

type Icon = {
  style?: CSSProperties;
  component: ReactNode | string;
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  text?: string;
  icon?: Icon;
  singleIcon?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  classes?: CSSProperties;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    variant,
    text,
    icon,
    singleIcon,
    disabled,
    ariaLabel,
    classes,
    ...butonProps
  } = props;

  return (
    <button
      type="button"
      className={`body-1 ${
        singleIcon ? `single-icon single-icon-${variant}` : 'button'
      } button-${variant} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      aria-label={ariaLabel}
      style={classes}
      {...butonProps}
    >
      {icon && (
        <span
          className="button-icon"
          {...(icon.style ? { style: icon.style } : {})}
        >
          {icon && icon.component}
        </span>
      )}
      {!singleIcon && text}
    </button>
  );
};
