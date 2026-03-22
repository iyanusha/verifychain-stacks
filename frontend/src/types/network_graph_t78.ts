export interface Network_graphEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_graphQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_graphAction78 = { type: 'create'; payload: Omit<Network_graphEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_graphEntity78> } | { type: 'delete'; id: string };
