export interface Test_registryConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Test_registryRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Test_registryFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
