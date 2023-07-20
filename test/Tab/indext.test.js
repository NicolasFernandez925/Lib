import { Tab as OriginalTab } from '../../export';
import { List } from '../../export';
import { Item } from '../../export';
import { Panel } from '../../export';
import { Tab } from '../../export';

describe('Tab exports', () => {
  test('exports List component', () => {
    expect(Tab.List).toBe(List);
  });

  test('exports Item component', () => {
    expect(Tab.Item).toBe(Item);
  });

  test('exports Panel component', () => {
    expect(Tab.Panel).toBe(Panel);
  });

  test('exports Tab component', () => {
    expect(Tab).toBe(OriginalTab);
  });
});
