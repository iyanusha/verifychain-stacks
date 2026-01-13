export interface Commitment_uiConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Commitment_uiRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Commitment_uiFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
