export interface Provider_dashboardConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Provider_dashboardRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Provider_dashboardFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
