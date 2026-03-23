export interface Penalty_historyEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Penalty_historyQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Penalty_historyAction28 = { type: 'create'; payload: Omit<Penalty_historyEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Penalty_historyEntity28> } | { type: 'delete'; id: string };
