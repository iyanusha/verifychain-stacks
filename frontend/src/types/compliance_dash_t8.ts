export interface Compliance_dashEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Compliance_dashQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Compliance_dashAction8 = { type: 'create'; payload: Omit<Compliance_dashEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Compliance_dashEntity8> } | { type: 'delete'; id: string };
