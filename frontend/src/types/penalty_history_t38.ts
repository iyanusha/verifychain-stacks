export interface Penalty_historyEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Penalty_historyQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Penalty_historyAction38 = { type: 'create'; payload: Omit<Penalty_historyEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Penalty_historyEntity38> } | { type: 'delete'; id: string };
