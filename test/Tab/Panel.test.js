import { render, screen } from '@testing-library/react';
import { Panel } from '../../export';
import { ContextTab } from '../../export';

describe('Item', () => {
  test('renders label and icon', () => {
    const children = <div>children</div>;
    const { rerender } = render(
      <ContextTab.Provider value={{ tab: 'Item 1', activeColor: '#FF0000' }}>
        <Panel
          value="Item 1"
          icon="Icon"
          children={children}
          st={{ padding: '30px' }}
        />
      </ContextTab.Provider>
    );

    expect(screen.getByText('children')).toBeInTheDocument();

    rerender(
      <ContextTab.Provider
        value={{
          tab: 'Item 2',
          activeColor: '#FF0000',
          st: { padding: '20px' },
        }}
      >
        <Panel value="Item 2" icon="Icon" children={children} />
      </ContextTab.Provider>
    );

    expect(screen.getByText('children')).toBeInTheDocument();
  });

  test('renders label and icon33', () => {
    const children = <div>children</div>;
    render(
      <ContextTab.Provider value={{ tab: 'Item 2', activeColor: '#FF0000' }}>
        <Panel value="Item 1" icon="Icon" children={children} />
      </ContextTab.Provider>
    );

    expect(screen.queryByText('children')).not.toBeInTheDocument();
  });
});
