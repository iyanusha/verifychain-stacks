export interface Network_graphEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_graphQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_graphAction28 = { type: 'create'; payload: Omit<Network_graphEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_graphEntity28> } | { type: 'delete'; id: string };
