export interface Provider_hooksConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Provider_hooksRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Provider_hooksFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
