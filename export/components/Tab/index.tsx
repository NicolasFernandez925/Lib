import { Tab as OriginalTab } from './Tab';
import { List } from './List';
import { Item } from './Item';
import { Panel } from './Panel';

import './Tab.css';
import '../../styles/global-style.css';

export { List } from './List';
export { Item } from './Item';
export { Panel } from './Panel';
export { ContextTab } from './Tab';

export const Tab = Object.assign(OriginalTab, {
  List: List,
  Item: Item,
  Panel: Panel,
}) as any;
