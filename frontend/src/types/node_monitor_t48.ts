export interface Node_monitorEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Node_monitorQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Node_monitorAction48 = { type: 'create'; payload: Omit<Node_monitorEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Node_monitorEntity48> } | { type: 'delete'; id: string };
