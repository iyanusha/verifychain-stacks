export interface Cost_analyzerEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Cost_analyzerQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Cost_analyzerAction38 = { type: 'create'; payload: Omit<Cost_analyzerEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Cost_analyzerEntity38> } | { type: 'delete'; id: string };
