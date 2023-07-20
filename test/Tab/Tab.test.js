import { render } from '@testing-library/react';
import { Tab, ContextTab } from '../../export';
import { useContext } from 'react';

// Componente hijo de prueba
const ChildComponent = () => {
  const { tab, activeColor, st } = useContext(ContextTab);

  // Aserciones para verificar las props recibidas
  expect(tab).toBe('tab1');
  expect(activeColor).toBe('#FF0000');
  expect(st).toEqual({});

  return null;
};

describe('Tab', () => {
  test('provides correct props to children through context', () => {
    const value = 'tab1';
    const activeColor = '#FF0000';
    const st = {};

    render(
      <ContextTab.Provider value={{ tab: value, activeColor, st }}>
        <Tab value={value} activeColor={activeColor} st={st}>
          <ChildComponent />
        </Tab>
      </ContextTab.Provider>
    );
  });
});
