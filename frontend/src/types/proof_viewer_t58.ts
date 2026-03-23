export interface Proof_viewerEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Proof_viewerQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Proof_viewerAction58 = { type: 'create'; payload: Omit<Proof_viewerEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Proof_viewerEntity58> } | { type: 'delete'; id: string };
