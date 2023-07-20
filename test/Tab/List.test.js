import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { List } from '../../export';

describe('List', () => {
  test('renders children with appropriate props', async () => {
    const user = userEvent.setup();
    const handleClickMock = jest.fn();
    const child1 = (
      <div key="1" label="Item 1">
        Item 1
      </div>
    );
    const child2 = (
      <div key="2" label="Item 2">
        Item 2
      </div>
    );
    const child3 = (
      <div key="3" label="Item 3">
        Item 3
      </div>
    );
    const children = [child1, child2, child3];

    render(
      <List handleClick={handleClickMock} aria-label="Tab List">
        {children}
      </List>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();

    await user.click(screen.getByText('Item 2'));
    expect(handleClickMock).toHaveBeenCalledWith('Item 2');
  });

  test('does not render non-element children', () => {
    const handleClickMock = jest.fn();
    const children = [
      <div key="4" label="Item 1">
        Item 1
      </div>,
      'Invalid Child',
    ];

    render(
      <List handleClick={handleClickMock} aria-label="Tab List">
        {children}
      </List>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Invalid Child')).toBeNull();
  });
});
