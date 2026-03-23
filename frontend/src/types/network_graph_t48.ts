export interface Network_graphEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_graphQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_graphAction48 = { type: 'create'; payload: Omit<Network_graphEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_graphEntity48> } | { type: 'delete'; id: string };
