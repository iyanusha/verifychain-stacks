export interface Sla_monitorEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Sla_monitorQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Sla_monitorAction8 = { type: 'create'; payload: Omit<Sla_monitorEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Sla_monitorEntity8> } | { type: 'delete'; id: string };
