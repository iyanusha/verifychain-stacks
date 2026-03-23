export interface Compliance_dashEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Compliance_dashQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Compliance_dashAction38 = { type: 'create'; payload: Omit<Compliance_dashEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Compliance_dashEntity38> } | { type: 'delete'; id: string };
