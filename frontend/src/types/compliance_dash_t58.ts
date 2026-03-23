export interface Compliance_dashEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Compliance_dashQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Compliance_dashAction58 = { type: 'create'; payload: Omit<Compliance_dashEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Compliance_dashEntity58> } | { type: 'delete'; id: string };
