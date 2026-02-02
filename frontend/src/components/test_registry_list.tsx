import { Test_registryItem } from './test_registry_item';

interface Item { title: string; value: string; description?: string; }

export function Test_registryList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Test_registryItem key={i} {...item} />)}</div>;
}
