export interface Sla_monitorEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Sla_monitorQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Sla_monitorAction58 = { type: 'create'; payload: Omit<Sla_monitorEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Sla_monitorEntity58> } | { type: 'delete'; id: string };
