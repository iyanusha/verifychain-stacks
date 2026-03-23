export interface Sla_monitorEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Sla_monitorQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Sla_monitorAction68 = { type: 'create'; payload: Omit<Sla_monitorEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Sla_monitorEntity68> } | { type: 'delete'; id: string };
