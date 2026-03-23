export interface Ops_consoleEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ops_consoleQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ops_consoleAction38 = { type: 'create'; payload: Omit<Ops_consoleEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Ops_consoleEntity38> } | { type: 'delete'; id: string };
