export interface Penalty_historyEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Penalty_historyQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Penalty_historyAction58 = { type: 'create'; payload: Omit<Penalty_historyEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Penalty_historyEntity58> } | { type: 'delete'; id: string };
