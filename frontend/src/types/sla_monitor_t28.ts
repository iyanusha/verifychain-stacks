export interface Sla_monitorEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Sla_monitorQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Sla_monitorAction28 = { type: 'create'; payload: Omit<Sla_monitorEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Sla_monitorEntity28> } | { type: 'delete'; id: string };
