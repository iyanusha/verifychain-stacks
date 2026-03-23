export interface Ops_consoleEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ops_consoleQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ops_consoleAction18 = { type: 'create'; payload: Omit<Ops_consoleEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Ops_consoleEntity18> } | { type: 'delete'; id: string };
