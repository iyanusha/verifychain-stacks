export interface Audit_logEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Audit_logQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Audit_logAction58 = { type: 'create'; payload: Omit<Audit_logEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Audit_logEntity58> } | { type: 'delete'; id: string };
