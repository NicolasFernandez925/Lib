import { CSSProperties, FC, KeyboardEvent, ReactElement } from 'react';
import '../../styles/global-style.css';
import './CardClaro.css';

interface CardClaroProps {
  icon: ReactElement;
  title: string;
  styles?: CSSProperties;
  onClick?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}

export const CardClaro: FC<CardClaroProps> = ({
  icon,
  title,
  styles,
  onClick,
  onKeyDown,
}) => {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`card-claro`}
      style={styles ? styles : {}}
    >
      <span className="card-claro__icon">{icon}</span>
      <p className="card-claro__title body-1">{title}</p>
    </div>
  );
};
