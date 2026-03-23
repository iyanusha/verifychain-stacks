export interface Audit_logEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Audit_logQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Audit_logAction8 = { type: 'create'; payload: Omit<Audit_logEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Audit_logEntity8> } | { type: 'delete'; id: string };
