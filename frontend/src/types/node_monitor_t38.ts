export interface Node_monitorEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Node_monitorQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Node_monitorAction38 = { type: 'create'; payload: Omit<Node_monitorEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Node_monitorEntity38> } | { type: 'delete'; id: string };
