export interface Penalty_historyEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Penalty_historyQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Penalty_historyAction78 = { type: 'create'; payload: Omit<Penalty_historyEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Penalty_historyEntity78> } | { type: 'delete'; id: string };
