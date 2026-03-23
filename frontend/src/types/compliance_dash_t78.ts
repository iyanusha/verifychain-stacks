export interface Compliance_dashEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Compliance_dashQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Compliance_dashAction78 = { type: 'create'; payload: Omit<Compliance_dashEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Compliance_dashEntity78> } | { type: 'delete'; id: string };
