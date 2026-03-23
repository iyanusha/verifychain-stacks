export interface Sla_monitorEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Sla_monitorQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Sla_monitorAction48 = { type: 'create'; payload: Omit<Sla_monitorEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Sla_monitorEntity48> } | { type: 'delete'; id: string };
