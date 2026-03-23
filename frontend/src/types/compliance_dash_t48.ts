export interface Compliance_dashEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Compliance_dashQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Compliance_dashAction48 = { type: 'create'; payload: Omit<Compliance_dashEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Compliance_dashEntity48> } | { type: 'delete'; id: string };
