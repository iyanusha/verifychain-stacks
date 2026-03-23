export interface Network_graphEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_graphQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_graphAction8 = { type: 'create'; payload: Omit<Network_graphEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_graphEntity8> } | { type: 'delete'; id: string };
