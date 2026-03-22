export interface Node_monitorEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Node_monitorQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Node_monitorAction68 = { type: 'create'; payload: Omit<Node_monitorEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Node_monitorEntity68> } | { type: 'delete'; id: string };
