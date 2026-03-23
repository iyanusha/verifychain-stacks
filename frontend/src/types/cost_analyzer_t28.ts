export interface Cost_analyzerEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Cost_analyzerQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Cost_analyzerAction28 = { type: 'create'; payload: Omit<Cost_analyzerEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Cost_analyzerEntity28> } | { type: 'delete'; id: string };
