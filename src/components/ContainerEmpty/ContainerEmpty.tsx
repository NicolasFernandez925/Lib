import React, { CSSProperties } from 'react';
import IconInformation from '../../assets/information.svg';

import './ContainerEmpty.css';

interface PropsContainerEmpty {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  styles?: CSSProperties;
  border?: boolean;
}

export const ContainerEmpty: React.FC<PropsContainerEmpty> = ({
  title,
  description,
  icon,
  styles,
  border,
}) => {
  return (
    <div
      tabIndex={0}
      style={styles ? styles : {}}
      className={`container-empty ${border ? 'container-empty__border' : ''}`}
    >
      {icon ? (
        <span className="container-empty__icon">{icon}</span>
      ) : (
        <img
          aria-hidden="true"
          src={IconInformation}
          alt="Información"
          className="container-empty__icon"
        />
      )}
      <p className="container-empty__title">{title}</p>
      <p className="container-empty__description">{description}</p>
    </div>
  );
};
