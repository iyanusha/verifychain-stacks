import { Commitment_uiItem } from './commitment_ui_item';

interface Item { title: string; value: string; description?: string; }

export function Commitment_uiList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Commitment_uiItem key={i} {...item} />)}</div>;
}
