import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../export';

describe('Button', () => {
  test('calls onClick handler when clicked', async () => {
    const onClickMock = jest.fn();
    const user = userEvent.setup();
    render(<Button variant="primary" onClick={onClickMock} />);

    const buttonElement = screen.getByRole('button');

    await user.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('renders disabled button', () => {
    render(<Button variant="primary" disabled />);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeDisabled();
  });

  test('renders button with text', () => {
    render(<Button variant="primary" text="Click me" />);

    const buttonElement = screen.getByRole('button', { name: 'Click me' });

    expect(buttonElement).toBeInTheDocument();
  });

  test('renders button with icon', () => {
    const iconComponent = <span>Icon</span>;
    render(
      <Button
        variant="primary"
        icon={{ component: iconComponent, style: { marginTop: '10px' } }}
      />
    );

    const iconElement = screen.getByText('Icon');

    expect(iconElement).toBeInTheDocument();
  });

  test('renders button with singleIcon', () => {
    const iconComponent = <span>Icon</span>;
    render(
      <Button
        variant="primary"
        icon={{ component: iconComponent }}
        singleIcon
      />
    );

    const iconElement = screen.getByText('Icon');

    expect(iconElement).toBeInTheDocument();
  });
});
