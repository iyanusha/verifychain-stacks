export interface Proof_viewerEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Proof_viewerQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Proof_viewerAction28 = { type: 'create'; payload: Omit<Proof_viewerEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Proof_viewerEntity28> } | { type: 'delete'; id: string };
