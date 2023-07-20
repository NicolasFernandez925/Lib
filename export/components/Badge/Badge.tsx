import React, { FC } from 'react';
import '../../styles/global-style.css';
import './Badge.css';

interface PropsBadge {
  variant?: 'success' | 'danger' | 'info';
  styles?: React.CSSProperties;
  text: string;
  onClick?: () => void;
}

export const Badge: FC<PropsBadge> = ({
  variant = 'success',
  styles,
  text,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`badge  badge-${variant} body-2`}
      style={styles ? styles : {}}
    >
      {text}
    </div>
  );
};
