import { Provider_dashboardItem } from './provider_dashboard_item';

interface Item { title: string; value: string; description?: string; }

export function Provider_dashboardList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Provider_dashboardItem key={i} {...item} />)}</div>;
}
