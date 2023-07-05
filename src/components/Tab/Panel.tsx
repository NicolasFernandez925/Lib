import { useContext } from 'react';
import { ContextTab } from './Tab';
import { IProps } from './Types';

export const Panel = ({
  children,
  st,
  id,
  value,
}: Omit<IProps, 'activeColor'>) => {
  const { tab } = useContext(ContextTab);

  const style = st
    ? { style: st }
    : { className: `tab-panel ${tab === value && 'show-panel'}` };

  return (
    <div role="tabpanel" id={id} {...style}>
      {tab === value ? children : null}
    </div>
  );
};
