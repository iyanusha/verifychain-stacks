import { Test_stakeItem } from './test_stake_item';

interface Item { title: string; value: string; description?: string; }

export function Test_stakeList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Test_stakeItem key={i} {...item} />)}</div>;
}
