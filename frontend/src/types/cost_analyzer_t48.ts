export interface Cost_analyzerEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Cost_analyzerQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Cost_analyzerAction48 = { type: 'create'; payload: Omit<Cost_analyzerEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Cost_analyzerEntity48> } | { type: 'delete'; id: string };
