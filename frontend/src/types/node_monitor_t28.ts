export interface Node_monitorEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Node_monitorQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Node_monitorAction28 = { type: 'create'; payload: Omit<Node_monitorEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Node_monitorEntity28> } | { type: 'delete'; id: string };
