export interface Capacity_plannerEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Capacity_plannerQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Capacity_plannerAction18 = { type: 'create'; payload: Omit<Capacity_plannerEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Capacity_plannerEntity18> } | { type: 'delete'; id: string };
