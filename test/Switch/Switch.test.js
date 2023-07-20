import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../../export';

describe('Switch', () => {
  test('calls onChange handler when clicked', async () => {
    const onChangeMock = jest.fn();
    const initialChecked = true;
    const user = userEvent.setup();

    render(<Switch checked={initialChecked} onChange={onChangeMock} />);

    const switchElement = screen.getByRole('checkbox');

    await user.click(switchElement);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test('calls onChange handler when Enter key is pressed', async () => {
    const onChangeMock = jest.fn();
    const initialChecked = true;

    render(<Switch checked={initialChecked} onChange={onChangeMock} />);

    const switchElement = screen.getByRole('checkbox');

    fireEvent.keyDown(switchElement, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
  });

  test('does not trigger any action on keyboard interaction other than Enter key', async () => {
    const onChangeMock = jest.fn();
    const initialChecked = false;

    render(
      <Switch
        checked={initialChecked}
        onChange={onChangeMock}
        styles={{ width: '200px' }}
      />
    );

    const switchElement = screen.getByRole('checkbox');

    fireEvent.keyDown(switchElement, { key: 'space', code: 'space' });

    await waitFor(() => {
      expect(onChangeMock).not.toHaveBeenCalled();
    });
  });
});
