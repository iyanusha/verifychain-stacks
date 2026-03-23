export interface Ops_consoleEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ops_consoleQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ops_consoleAction68 = { type: 'create'; payload: Omit<Ops_consoleEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Ops_consoleEntity68> } | { type: 'delete'; id: string };
