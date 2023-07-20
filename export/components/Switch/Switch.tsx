import { CSSProperties, FC } from 'react';
import { mdiClose, mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import '../../styles/global-style.css';
import './Switch.css';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  styles?: CSSProperties;
}

export const Switch: FC<SwitchProps> = ({ checked, onChange, styles }) => {
  const handleClick = (event: any) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      onChange(!checked);
    } else if (event.type === 'click') {
      onChange(!checked);
    }
  };

  return (
    <div
      tabIndex={0}
      className="switch"
      style={styles ? styles : {}}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <input
        onChange={handleClick}
        type="checkbox"
        className="switch-input"
        checked={checked}
      />
      <div
        className={`switch-slider ${
          checked
            ? 'switch-slider-close'
            : 'switch-slider-check switch-slider__border'
        }`}
      >
        {!checked ? (
          <Icon
            path={mdiClose}
            size={0.7}
            color={'var(--color-primary-white)'}
            className={`mdi-icon-close`}
          />
        ) : (
          <Icon
            path={mdiCheck}
            size={0.7}
            color={'var(--color-primary-institutional-blue'}
            className={`mdi-icon-check`}
          />
        )}
      </div>
    </div>
  );
};
