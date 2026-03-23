export interface Compliance_dashEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Compliance_dashQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Compliance_dashAction68 = { type: 'create'; payload: Omit<Compliance_dashEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Compliance_dashEntity68> } | { type: 'delete'; id: string };
