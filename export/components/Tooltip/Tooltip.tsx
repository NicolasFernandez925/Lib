import React, {
  CSSProperties,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useState,
} from 'react';
import '../../styles/global-style.css';
import './Tooltip.css';

type TooltipProps = {
  position: 'left' | 'right' | 'top' | 'bottom';
  content: string;
  children: ReactNode;
  classNames?: CSSProperties;
};

export const Tooltip: FC<TooltipProps> = ({
  position = 'top',
  content,
  children,
  classNames,
}) => {
  const getPositionStyle = (): React.CSSProperties => {
    switch (position) {
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '10px',
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '10px',
        };
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '10px',
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '10px',
        };
    }
  };

  useEffect(() => {
    if (classNames?.backgroundColor || classNames?.background) {
      document.documentElement.style.setProperty(
        '--tooltip-color',
        String(classNames.backgroundColor || classNames?.background)
      );
    }
  }, [classNames]);

  const tooltipStyles: CSSProperties = classNames
    ? {
        ...getPositionStyle(),
        ...classNames,
      }
    : getPositionStyle();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="tooltip-container">
      {cloneElement(children as ReactElement<any>, {
        'aria-labelledby': isHovered ? 'tooltip' : undefined,

        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}

      <div
        id="tooltip"
        className={`tooltip tooltip-${position} body-2`}
        style={tooltipStyles}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
};
