export interface Capacity_plannerEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Capacity_plannerQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Capacity_plannerAction28 = { type: 'create'; payload: Omit<Capacity_plannerEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Capacity_plannerEntity28> } | { type: 'delete'; id: string };
