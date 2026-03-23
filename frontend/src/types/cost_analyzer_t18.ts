export interface Cost_analyzerEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Cost_analyzerQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Cost_analyzerAction18 = { type: 'create'; payload: Omit<Cost_analyzerEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Cost_analyzerEntity18> } | { type: 'delete'; id: string };
