export interface Test_providerConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Test_providerRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Test_providerFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
