export interface Compliance_dashEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Compliance_dashQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Compliance_dashAction18 = { type: 'create'; payload: Omit<Compliance_dashEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Compliance_dashEntity18> } | { type: 'delete'; id: string };
