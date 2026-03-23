export interface Sla_monitorEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Sla_monitorQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Sla_monitorAction78 = { type: 'create'; payload: Omit<Sla_monitorEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Sla_monitorEntity78> } | { type: 'delete'; id: string };
