export interface Cost_analyzerEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Cost_analyzerQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Cost_analyzerAction68 = { type: 'create'; payload: Omit<Cost_analyzerEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Cost_analyzerEntity68> } | { type: 'delete'; id: string };
