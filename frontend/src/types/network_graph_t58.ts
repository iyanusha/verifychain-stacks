export interface Network_graphEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_graphQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_graphAction58 = { type: 'create'; payload: Omit<Network_graphEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_graphEntity58> } | { type: 'delete'; id: string };
