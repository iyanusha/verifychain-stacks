export interface Audit_logEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Audit_logQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Audit_logAction18 = { type: 'create'; payload: Omit<Audit_logEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Audit_logEntity18> } | { type: 'delete'; id: string };
