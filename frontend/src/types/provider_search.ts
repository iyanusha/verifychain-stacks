export interface Provider_searchConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Provider_searchRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Provider_searchFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
