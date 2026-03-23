export interface Capacity_plannerEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Capacity_plannerQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Capacity_plannerAction78 = { type: 'create'; payload: Omit<Capacity_plannerEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Capacity_plannerEntity78> } | { type: 'delete'; id: string };
