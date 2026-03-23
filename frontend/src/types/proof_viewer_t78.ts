export interface Proof_viewerEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Proof_viewerQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Proof_viewerAction78 = { type: 'create'; payload: Omit<Proof_viewerEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Proof_viewerEntity78> } | { type: 'delete'; id: string };
