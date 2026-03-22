export interface Node_monitorEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Node_monitorQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Node_monitorAction8 = { type: 'create'; payload: Omit<Node_monitorEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Node_monitorEntity8> } | { type: 'delete'; id: string };
