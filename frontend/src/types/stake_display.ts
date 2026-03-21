export interface Stake_displayConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Stake_displayRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Stake_displayFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
