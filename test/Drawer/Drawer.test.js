import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from '../../export';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node) => node,
}));

describe('Drawer', () => {
  test('calls onClose handler when overlay is clicked', async () => {
    const onCloseMock = jest.fn();
    const user = userEvent.setup();

    render(
      <Drawer
        isOpen={true}
        width={300}
        position="left"
        onClose={onCloseMock}
        id="root"
      >
        Content
      </Drawer>
    );

    const overlayElement = screen.getByTestId('drawer-overlay');

    await user.click(overlayElement);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClose handler when close button is clicked', async () => {
    const onCloseMock = jest.fn();
    render(
      <Drawer
        isOpen={true}
        width={300}
        position="left"
        onClose={onCloseMock}
        id="root"
      >
        Content
      </Drawer>
    );

    const closeButtonElement = screen.getByLabelText('Cerrar modal');

    await userEvent.click(closeButtonElement);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClose handler when ESCAPE key is pressed', async () => {
    const onCloseMock = jest.fn();
    render(
      <Drawer
        isOpen={true}
        width={300}
        position="left"
        onClose={onCloseMock}
        id="root"
        subTitle="SubTitle"
        divide
      >
        Content
      </Drawer>
    );

    const drawerElement = screen.getByRole('dialog');

    fireEvent.keyDown(drawerElement, { key: 'Escape', code: 'Escape' });
    await waitFor(() => expect(onCloseMock).toHaveBeenCalledTimes(1));
  });

  test('The modal should not close when a non-ESCAPE key is pressed', async () => {
    const onCloseMock = jest.fn();
    render(
      <Drawer
        isOpen={true}
        width={300}
        position="left"
        onClose={onCloseMock}
        id="root"
        subTitle="SubTitle"
        divide
      >
        Content
      </Drawer>
    );

    const drawerElement = screen.getByRole('dialog');

    fireEvent.keyDown(drawerElement, { key: 'Tab', code: 'Tab' });
    await waitFor(() => expect(drawerElement).toBeInTheDocument());
  });

  test('The modal should not be seen from the right since it is not open', async () => {
    const onCloseMock = jest.fn();
    render(
      <Drawer
        isOpen={false}
        width={300}
        position="right"
        onClose={onCloseMock}
        id="root"
      >
        Content
      </Drawer>
    );
    const overlayElement = screen.getByTestId('drawer-overlay');

    expect(overlayElement).toBeInTheDocument();
  });

  test('The modal should not be seen from the left since it is not open', async () => {
    const onCloseMock = jest.fn();
    render(
      <Drawer
        isOpen={false}
        width={300}
        position="left"
        onClose={onCloseMock}
        id="root"
      >
        Content
      </Drawer>
    );
    const overlayElement = screen.getByTestId('drawer-overlay');

    expect(overlayElement).toBeInTheDocument();
  });
});
