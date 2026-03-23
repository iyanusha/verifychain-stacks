export interface Sla_monitorEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Sla_monitorQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Sla_monitorAction38 = { type: 'create'; payload: Omit<Sla_monitorEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Sla_monitorEntity38> } | { type: 'delete'; id: string };
