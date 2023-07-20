import ReactDOM from 'react-dom';
import React, { CSSProperties, FC, ReactNode, useEffect, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import '../../styles/global-style.css';
import './Drawer.css';

interface DrawerProps {
  isOpen: boolean;
  width: number;
  position: 'left' | 'right';
  onClose: () => void;
  title?: string;
  subTitle?: string;
  classes?: CSSProperties;
  divide?: boolean;
  children: ReactNode;
  id: string;
}

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  width,
  title,
  position,
  onClose,
  children,
  classes,
  subTitle,
  divide,
  id,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const modalStyle: CSSProperties = {
    width: `${width}px`,
    transform: isOpen
      ? 'translateX(0)'
      : `translateX(${position === 'right' ? '100%' : '-100%'})`,
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current!.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      contentRef.current!.scrollTop = 0;
    }
  }, [isOpen]);

  const overlayStyle: CSSProperties = {
    opacity: isOpen ? 1 : 0,
    transition: 'opacity 0.4s ease-in-out, visibility 0.4s ease-in-out',
    visibility: isOpen ? 'visible' : 'hidden',
  };

  const contentStyle: CSSProperties = Object.assign(
    {},
    {
      maxHeight: 'calc(100% - 40px)',
      overflowY: 'auto',
    },
    classes
  );

  const draweContainerClassName = `drawer-container ${position} ${
    isOpen ? 'drawer-open' : ''
  }`;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div>
      <div
        data-testid="drawer-overlay"
        className="drawer-overlay"
        style={overlayStyle}
        onClick={onClose}
      ></div>

      <div
        id="drawer"
        role="dialog"
        aria-modal={isOpen}
        aria-labelledby="drawer-title"
        {...(subTitle ? { 'aria-describedby': 'drawer-subTitle' } : {})}
        aria-hidden={!isOpen}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={draweContainerClassName}
        style={modalStyle}
        ref={modalRef}
      >
        <div ref={contentRef} className="drawer-content" style={contentStyle}>
          <div className="header-drawer">
            <h3 id="drawer-title title-1">{title}</h3>
            <button
              aria-label="Cerrar modal"
              onClick={onClose}
              className="icon-close"
            >
              <Icon path={mdiClose} size={0.7} />
            </button>
            {subTitle && <h3 id="drawer-subTitle">{subTitle}</h3>}
          </div>
          {divide && <hr className="divide" />}
          <div className="drawer-content-children"> {children}</div>
        </div>
      </div>
    </div>,
    document.getElementById(id) as HTMLElement
  );
};
