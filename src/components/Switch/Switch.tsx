import React, { CSSProperties } from 'react';
import Icon from '@mdi/react';
import { mdiClose, mdiCheck } from '@mdi/js';

import './Switch.css';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  styles?: CSSProperties;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  styles,
}) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <div className="switch" style={styles ? styles : {}} onClick={handleClick}>
      <input
        type="checkbox"
        className="switch-input"
        checked={checked}
        onChange={() => {}}
      />
      <div className="switch-slider">
        <Icon
          path={mdiClose}
          size={1}
          className={`mdi-icon ${checked ? 'checked' : ''}`}
        />
        <Icon
          path={mdiCheck}
          size={1}
          className={`mdi-icon ${checked ? '' : 'checked'}`}
        />
      </div>
    </div>
  );
};
