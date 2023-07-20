import React, { Children, cloneElement, isValidElement } from 'react';

interface ITabListProps {
  handleClick: (value: string) => void;
  children: React.ReactElement[] | React.ReactElement;
  'aria-label': string;
}

export const List = ({ handleClick, children, ...rest }: ITabListProps) => {
  const arrayChildren = Children.toArray(children);

  return (
    <div className="tabs" role="tablist" {...rest}>
      {Children.map(arrayChildren, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            key: index.toString(),
            onClick: () => handleClick(child.props.label),
            ...child.props,
          });
        }
        return null;
      })}
    </div>
  );
};
