import React, { ButtonHTMLAttributes, CSSProperties } from 'react';
import './Button.css';

type Icon = {
  style?: React.CSSProperties;
  component: React.ReactNode | string;
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

export const Button: React.FC<ButtonProps> = (props) => {
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
      className={`${
        singleIcon ? `single-icon single-icon-${variant}` : 'button'
      } button-${variant} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      aria-label={ariaLabel}
      style={classes}
      {...butonProps}
    >
      {icon && (
        <span className="button-icon" {...(icon ? { style: icon.style } : {})}>
          {icon && icon.component}
        </span>
      )}
      {!singleIcon && text}
    </button>
  );
};
