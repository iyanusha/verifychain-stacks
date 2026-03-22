export interface Node_monitorEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Node_monitorQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Node_monitorAction58 = { type: 'create'; payload: Omit<Node_monitorEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Node_monitorEntity58> } | { type: 'delete'; id: string };
