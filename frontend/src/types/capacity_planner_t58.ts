export interface Capacity_plannerEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Capacity_plannerQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Capacity_plannerAction58 = { type: 'create'; payload: Omit<Capacity_plannerEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Capacity_plannerEntity58> } | { type: 'delete'; id: string };
