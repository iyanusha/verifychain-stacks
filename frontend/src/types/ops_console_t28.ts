export interface Ops_consoleEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ops_consoleQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ops_consoleAction28 = { type: 'create'; payload: Omit<Ops_consoleEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Ops_consoleEntity28> } | { type: 'delete'; id: string };
