import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Alert } from '../../export';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Alert', () => {
  test('should render an alert with the provided message and description', async () => {
    const alertRef = React.createRef();
    const message = 'Test message';
    const description = 'Test description';

    render(<Alert ref={alertRef} position="top-right" variant="info" />);

    await act(async () => {
      alertRef.current.addAlert(message, description);
    });

    const alertWithTitle = screen.getByText(message);
    const alertWithDescription = screen.getByText(description);

    expect(alertWithTitle).toBeInTheDocument();
    expect(alertWithDescription).toBeInTheDocument();
  });

  test('should close an alert when the close button is clicked', async () => {
    render(<Alert position="top-right" variant="info" />);
    const user = userEvent.setup();
    const alertRef = React.createRef();
    const message = 'Test message';

    render(<Alert ref={alertRef} position="top-right" variant="info" />);

    await act(async () => {
      alertRef.current.addAlert(message);
    });

    const iconCloseAlert = screen.getByLabelText('Cerrar alerta');
    const alert = screen.queryByText(message);

    expect(iconCloseAlert).toBeInTheDocument();

    await user.click(iconCloseAlert);

    await waitFor(() => {
      expect(alert).not.toBeInTheDocument();
    });
  });

  test('should close an alert when the close button is clicked or the ESCAPE key is pressed', async () => {
    const alertRef = React.createRef();
    const message = 'Test message';

    render(<Alert ref={alertRef} />);

    const alert = screen.queryByText(message);

    await act(async () => {
      alertRef.current.addAlert(message);
    });

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(alert).not.toBeInTheDocument();
    });
  });

  test('should render alerts with correct position', async () => {
    const alertRef = React.createRef();
    const messages = ['Message 1', 'Message 2', 'Message 3'];

    render(<Alert ref={alertRef} position="top-right" variant="info" />);

    for (const message of messages) {
      await act(async () => {
        alertRef.current.addAlert(message);
      });
    }

    const alertElements = await screen.findAllByRole('alert');

    expect(alertElements.length).toBe(messages.length);
  });

  test('Should not close the alert when a non-Escape key is pressed', async () => {
    const alertRef = React.createRef();
    const message = 'Test message';
    render(<Alert ref={alertRef} position="top-right" variant="info" />);

    await act(async () => {
      alertRef.current.addAlert(message);
    });

    const alert = screen.queryByText(message);

    fireEvent.keyDown(document, { key: 'Tab' });
    await waitFor(() => {
      expect(alert).toBeInTheDocument();
    });
  });

  test('should delete the last altert by pressing the ESCAPE key when more than one is added', async () => {
    const alertRef = React.createRef();
    render(<Alert ref={alertRef} position="top-right" variant="info" />);

    const messages = ['Message 1', 'Message 2', 'Message 3'];

    render(<Alert ref={alertRef} position="top-right" variant="info" />);

    for (const message of messages) {
      await act(async () => {
        alertRef.current.addAlert(message);
      });
    }
    const alertElements = await screen.findAllByRole('alert');
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(alertElements[2]).not.toBeInTheDocument();
    });
  });
});
