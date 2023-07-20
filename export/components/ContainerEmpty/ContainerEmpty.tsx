import { CSSProperties, FC, ReactElement } from 'react';
import Icon from '@mdi/react';
import { mdiInformation } from '@mdi/js';
import '../../styles/global-style.css';
import './ContainerEmpty.css';

interface PropsContainerEmpty {
  title: string;
  description?: string;
  icon?: ReactElement;
  styles?: CSSProperties;
  border?: boolean;
}

export const ContainerEmpty: FC<PropsContainerEmpty> = ({
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
        <Icon
          color={'var(--color-primary-gray-3)'}
          aria-hidden="true"
          path={mdiInformation}
          size={2}
        />
      )}
      <p className="container-empty__title title-1">{title}</p>
      <p className="container-empty__description body-2">{description}</p>
    </div>
  );
};
