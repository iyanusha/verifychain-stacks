import { Challenge_formItem } from './challenge_form_item';

interface Item { title: string; value: string; description?: string; }

export function Challenge_formList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Challenge_formItem key={i} {...item} />)}</div>;
}
