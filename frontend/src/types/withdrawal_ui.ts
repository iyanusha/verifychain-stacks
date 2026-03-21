export interface Withdrawal_uiConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Withdrawal_uiRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Withdrawal_uiFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
