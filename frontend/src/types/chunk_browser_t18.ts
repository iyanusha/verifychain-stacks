export interface Chunk_browserEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Chunk_browserQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Chunk_browserAction18 = { type: 'create'; payload: Omit<Chunk_browserEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Chunk_browserEntity18> } | { type: 'delete'; id: string };
