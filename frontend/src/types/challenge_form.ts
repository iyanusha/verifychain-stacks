export interface Challenge_formConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Challenge_formRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Challenge_formFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
