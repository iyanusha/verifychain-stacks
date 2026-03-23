export interface Proof_viewerEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Proof_viewerQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Proof_viewerAction18 = { type: 'create'; payload: Omit<Proof_viewerEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Proof_viewerEntity18> } | { type: 'delete'; id: string };
