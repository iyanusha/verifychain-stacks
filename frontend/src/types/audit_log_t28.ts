export interface Audit_logEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Audit_logQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Audit_logAction28 = { type: 'create'; payload: Omit<Audit_logEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Audit_logEntity28> } | { type: 'delete'; id: string };
