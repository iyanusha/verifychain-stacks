export interface Ops_consoleEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ops_consoleQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ops_consoleAction48 = { type: 'create'; payload: Omit<Ops_consoleEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Ops_consoleEntity48> } | { type: 'delete'; id: string };
