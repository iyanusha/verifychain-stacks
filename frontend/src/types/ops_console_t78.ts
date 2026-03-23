export interface Ops_consoleEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ops_consoleQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ops_consoleAction78 = { type: 'create'; payload: Omit<Ops_consoleEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Ops_consoleEntity78> } | { type: 'delete'; id: string };
