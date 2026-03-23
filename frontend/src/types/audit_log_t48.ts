export interface Audit_logEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Audit_logQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Audit_logAction48 = { type: 'create'; payload: Omit<Audit_logEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Audit_logEntity48> } | { type: 'delete'; id: string };
