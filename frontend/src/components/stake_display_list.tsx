import { Stake_displayItem } from './stake_display_item';

interface Item { title: string; value: string; description?: string; }

export function Stake_displayList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Stake_displayItem key={i} {...item} />)}</div>;
}
