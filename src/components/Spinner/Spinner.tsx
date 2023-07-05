import React, { CSSProperties } from 'react';
import './Spinner.css';

interface PropsSpinner {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  styles?: CSSProperties;
}

export const Spinner: React.FC<PropsSpinner> = ({
  variant = 'primary',
  size = 'md',
  styles,
}) => {
  return (
    <div
      tabIndex={0}
      className={`spinner spinner-${variant} spinner-${size}`}
      role="status"
      aria-label="Cargando"
      style={styles ? styles : {}}
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};
