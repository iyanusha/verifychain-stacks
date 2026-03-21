export interface Stake_managementConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Stake_managementRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Stake_managementFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
