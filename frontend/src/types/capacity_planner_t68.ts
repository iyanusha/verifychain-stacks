export interface Capacity_plannerEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Capacity_plannerQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Capacity_plannerAction68 = { type: 'create'; payload: Omit<Capacity_plannerEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Capacity_plannerEntity68> } | { type: 'delete'; id: string };
