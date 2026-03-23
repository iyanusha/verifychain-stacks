export interface Penalty_historyEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Penalty_historyQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Penalty_historyAction68 = { type: 'create'; payload: Omit<Penalty_historyEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Penalty_historyEntity68> } | { type: 'delete'; id: string };
