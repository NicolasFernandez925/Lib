import { createContext, CSSProperties, useMemo } from 'react';
import { IProps } from './Types';

interface InitialState {
  tab: string;
  activeColor?: string;
  st?: CSSProperties;
}

export const ContextTab = createContext({} as InitialState);

export const Tab = ({
  children,
  value,
  activeColor,
  st,
}: Omit<IProps, 'id'>) => {
  const valueMemo = useMemo(() => {
    return {
      tab: value,
      activeColor,
      st,
    };
  }, [value, st, activeColor]);

  return (
    <nav role="tablist">
      <ContextTab.Provider value={valueMemo}>{children}</ContextTab.Provider>
    </nav>
  );
};
