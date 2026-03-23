export interface Ops_consoleEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ops_consoleQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ops_consoleAction58 = { type: 'create'; payload: Omit<Ops_consoleEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Ops_consoleEntity58> } | { type: 'delete'; id: string };
