import { render, screen } from '@testing-library/react';
import { Item } from '../../export';
import { ContextTab } from '../../export';

describe('Item', () => {
  test('renders label and icon', () => {
    render(
      <ContextTab.Provider
        value={{ tab: 'Item 1', activeColor: '#FF0000', st: {} }}
      >
        <Item label="Item 1" icon="Icon" />
      </ContextTab.Provider>
    );

    expect(screen.getByRole('tab')).toHaveTextContent('Item 1');
  });

  test('applies disabled attribute and styles when disabled prop is present', () => {
    render(
      <ContextTab.Provider
        value={{ tab: 'Item 1', activeColor: '#FF0000', st: {} }}
      >
        <Item label="Item 1" disabled />
      </ContextTab.Provider>
    );

    expect(screen.getByRole('tab')).toHaveAttribute('aria-disabled', 'true');
  });
});
