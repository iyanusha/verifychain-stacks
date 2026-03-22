export interface Node_monitorEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Node_monitorQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Node_monitorAction18 = { type: 'create'; payload: Omit<Node_monitorEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Node_monitorEntity18> } | { type: 'delete'; id: string };
