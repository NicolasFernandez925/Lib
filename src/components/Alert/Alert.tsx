import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  Ref,
  useImperativeHandle,
  useCallback,
} from 'react';

import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { mdiCheckCircle } from '@mdi/js';
import { mdiInformation } from '@mdi/js';
import { mdiCloseCircle } from '@mdi/js';
import { mdiAlert } from '@mdi/js';

import './Alert.css';

interface AlertHandle {
  addAlert: (message: string, description?: string) => void;
}

type AlertProps = {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  variant?: 'error' | 'info' | 'success' | 'alert';
};

type AlertItem = {
  id: number;
  message: string;
  description?: string;
  position: string;
};

export const Alert = forwardRef(
  (
    { position = 'top-right', variant = 'info' }: AlertProps,
    ref: Ref<AlertHandle>
  ) => {
    const [heightAlert, setHeightAlert] = useState(10);

    const containerAlertRef = useRef<HTMLDivElement | null>(null);
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

    const handleClose = useCallback(
      (id: number) => {
        setAlerts(alerts.filter((alert) => alert.id !== id));
      },
      [alerts]
    );

    const handleAddAlert = (
      mensaje: string,
      description: string | undefined
    ) => {
      const newAlert: AlertItem = {
        id: Date.now(),
        message: mensaje,
        description: description,
        position: position,
      };

      setAlerts([...alerts, newAlert]);
    };

    useImperativeHandle(ref, () => ({
      addAlert: (message: string, description?: string) => {
        handleAddAlert(message, description);
      },
    }));

    const icons = {
      info: <Icon path={mdiInformation} color="#006274" size={0.9} />,
      error: <Icon path={mdiCloseCircle} color="#8B0000" size={0.9} />,
      success: <Icon path={mdiCheckCircle} color="#0b7329" size={0.9} />,
      alert: <Icon path={mdiAlert} color="#b50000" size={0.9} />,
    };

    const findIcon = icons[variant];

    useEffect(() => {
      if (containerAlertRef.current) {
        const computedStyles = getComputedStyle(containerAlertRef.current);
        const height =
          containerAlertRef.current.offsetHeight +
          parseInt(computedStyles.paddingTop, 10) +
          parseInt(computedStyles.paddingBottom, 10);
        parseInt(computedStyles.borderBottomWidth, 10);

        setHeightAlert(height - 10);
      }
    }, [alerts]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          if (alerts.length > 0) {
            const lastAlert = alerts[alerts.length - 1];
            handleClose(lastAlert.id);
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [alerts, handleClose]);

    return (
      <div className="alert-container">
        <div className="alert-stack">
          {alerts.map((alert, index) => (
            <div
              key={alert.id}
              ref={containerAlertRef}
              className={`alert alert-${alert.position} alert-${variant}`}
              style={
                index !== 0
                  ? {
                      [position.split('-')[0]]: `${index * heightAlert + 20}px`,
                    }
                  : {}
              }
              role="alert"
              aria-live="polite"
            >
              <span aria-hidden="true" className="icon-alert">
                {findIcon}
              </span>
              <div className="alert-container-message">
                <p className="alert-message">{alert.message}</p>
                {alert.description && (
                  <p className="alert-description">{alert.description}</p>
                )}
              </div>

              <button
                aria-hidden="true"
                aria-label="Cerrar alerta"
                className="close-button"
                onClick={() => handleClose(alert.id)}
              >
                <Icon path={mdiClose} size={0.7} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
