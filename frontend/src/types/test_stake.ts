export interface Test_stakeConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Test_stakeRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Test_stakeFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
