export interface Proof_viewerEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Proof_viewerQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Proof_viewerAction48 = { type: 'create'; payload: Omit<Proof_viewerEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Proof_viewerEntity48> } | { type: 'delete'; id: string };
