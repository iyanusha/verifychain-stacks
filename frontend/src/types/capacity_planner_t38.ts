export interface Capacity_plannerEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Capacity_plannerQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Capacity_plannerAction38 = { type: 'create'; payload: Omit<Capacity_plannerEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Capacity_plannerEntity38> } | { type: 'delete'; id: string };
