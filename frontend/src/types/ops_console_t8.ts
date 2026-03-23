export interface Ops_consoleEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ops_consoleQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ops_consoleAction8 = { type: 'create'; payload: Omit<Ops_consoleEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Ops_consoleEntity8> } | { type: 'delete'; id: string };
