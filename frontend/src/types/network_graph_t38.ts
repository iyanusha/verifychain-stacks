export interface Network_graphEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_graphQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_graphAction38 = { type: 'create'; payload: Omit<Network_graphEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_graphEntity38> } | { type: 'delete'; id: string };
