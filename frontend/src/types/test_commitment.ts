export interface Test_commitmentConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Test_commitmentRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Test_commitmentFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
