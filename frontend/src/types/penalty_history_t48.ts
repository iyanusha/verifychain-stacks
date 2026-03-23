export interface Penalty_historyEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Penalty_historyQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Penalty_historyAction48 = { type: 'create'; payload: Omit<Penalty_historyEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Penalty_historyEntity48> } | { type: 'delete'; id: string };
