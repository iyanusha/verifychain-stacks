export interface Audit_logEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Audit_logQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Audit_logAction68 = { type: 'create'; payload: Omit<Audit_logEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Audit_logEntity68> } | { type: 'delete'; id: string };
