export interface Audit_logEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Audit_logQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Audit_logAction78 = { type: 'create'; payload: Omit<Audit_logEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Audit_logEntity78> } | { type: 'delete'; id: string };
