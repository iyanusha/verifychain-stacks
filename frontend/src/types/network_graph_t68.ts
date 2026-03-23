export interface Network_graphEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_graphQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_graphAction68 = { type: 'create'; payload: Omit<Network_graphEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_graphEntity68> } | { type: 'delete'; id: string };
