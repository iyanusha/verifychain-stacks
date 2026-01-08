import { Provider_hooksItem } from './provider_hooks_item';

interface Item { title: string; value: string; description?: string; }

export function Provider_hooksList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Provider_hooksItem key={i} {...item} />)}</div>;
}
