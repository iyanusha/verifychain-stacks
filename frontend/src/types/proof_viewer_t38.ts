export interface Proof_viewerEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Proof_viewerQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Proof_viewerAction38 = { type: 'create'; payload: Omit<Proof_viewerEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Proof_viewerEntity38> } | { type: 'delete'; id: string };
