export interface Verification_uiConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Verification_uiRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Verification_uiFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
