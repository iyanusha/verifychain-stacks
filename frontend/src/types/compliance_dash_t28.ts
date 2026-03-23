export interface Compliance_dashEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Compliance_dashQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Compliance_dashAction28 = { type: 'create'; payload: Omit<Compliance_dashEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Compliance_dashEntity28> } | { type: 'delete'; id: string };
