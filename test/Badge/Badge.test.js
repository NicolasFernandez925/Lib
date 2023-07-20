import { render, screen } from '@testing-library/react';
import { Badge } from '../../export';
import userEvent from '@testing-library/user-event';

describe('Badge', () => {
  test('renders with default variant and text', () => {
    render(<Badge text="Default Badge" styles={{ padding: '20px' }} />);

    const badgeElement = screen.getByText('Default Badge');

    expect(badgeElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', async () => {
    const onClickMock = jest.fn();
    const user = userEvent.setup();
    render(<Badge text="Clickable Badge" onClick={onClickMock} />);

    const badgeElement = screen.getByText('Clickable Badge');

    await user.click(badgeElement);

    expect(onClickMock).toHaveBeenCalled();
  });
});
