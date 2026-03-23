export interface Capacity_plannerEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Capacity_plannerQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Capacity_plannerAction48 = { type: 'create'; payload: Omit<Capacity_plannerEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Capacity_plannerEntity48> } | { type: 'delete'; id: string };
