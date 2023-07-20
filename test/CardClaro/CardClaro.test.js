import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardClaro } from '../../export';

describe('CardClaro', () => {
  test('calls onClick handler when clicked', async () => {
    const onClickMock = jest.fn();
    const user = userEvent.setup();

    render(
      <CardClaro icon={<span>Icon</span>} title="Title" onClick={onClickMock} />
    );

    const cardElement = screen.getByText('Title');

    await user.click(cardElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('calls onKeyDown handler when a key is pressed', async () => {
    const onKeyDownMock = jest.fn();
    render(
      <CardClaro
        icon={<span>Icon</span>}
        title="Title"
        onKeyDown={onKeyDownMock}
      />
    );

    const cardElement = screen.getByText('Title');

    await userEvent.type(cardElement, '{enter}');

    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
  });

  test('renders card with correct icon', () => {
    render(<CardClaro icon={<span>Icon</span>} title="Title" />);

    const iconElement = screen.getByText('Icon');

    expect(iconElement).toBeInTheDocument();
  });

  test('renders card with correct title', () => {
    render(
      <CardClaro
        icon={<span>Icon</span>}
        title="Title"
        styles={{ padding: '10px' }}
      />
    );

    const titleElement = screen.getByText('Title');

    expect(titleElement).toBeInTheDocument();
  });
});
