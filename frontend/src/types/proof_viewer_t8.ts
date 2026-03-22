export interface Proof_viewerEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Proof_viewerQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Proof_viewerAction8 = { type: 'create'; payload: Omit<Proof_viewerEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Proof_viewerEntity8> } | { type: 'delete'; id: string };
