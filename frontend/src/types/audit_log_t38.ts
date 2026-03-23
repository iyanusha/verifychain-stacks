export interface Audit_logEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Audit_logQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Audit_logAction38 = { type: 'create'; payload: Omit<Audit_logEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Audit_logEntity38> } | { type: 'delete'; id: string };
