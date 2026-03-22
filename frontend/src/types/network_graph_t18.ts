export interface Network_graphEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_graphQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_graphAction18 = { type: 'create'; payload: Omit<Network_graphEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_graphEntity18> } | { type: 'delete'; id: string };
