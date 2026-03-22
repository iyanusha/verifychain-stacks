export interface Penalty_historyEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Penalty_historyQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Penalty_historyAction18 = { type: 'create'; payload: Omit<Penalty_historyEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Penalty_historyEntity18> } | { type: 'delete'; id: string };
