export interface Cost_analyzerEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Cost_analyzerQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Cost_analyzerAction78 = { type: 'create'; payload: Omit<Cost_analyzerEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Cost_analyzerEntity78> } | { type: 'delete'; id: string };
