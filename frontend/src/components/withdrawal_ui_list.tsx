import { Withdrawal_uiItem } from './withdrawal_ui_item';

interface Item { title: string; value: string; description?: string; }

export function Withdrawal_uiList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Withdrawal_uiItem key={i} {...item} />)}</div>;
}
