export interface Node_monitorEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Node_monitorQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Node_monitorAction78 = { type: 'create'; payload: Omit<Node_monitorEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Node_monitorEntity78> } | { type: 'delete'; id: string };
