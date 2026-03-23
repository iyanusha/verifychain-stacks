export interface Sla_monitorEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Sla_monitorQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Sla_monitorAction18 = { type: 'create'; payload: Omit<Sla_monitorEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Sla_monitorEntity18> } | { type: 'delete'; id: string };
