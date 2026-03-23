export interface Chunk_browserEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Chunk_browserQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Chunk_browserAction78 = { type: 'create'; payload: Omit<Chunk_browserEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Chunk_browserEntity78> } | { type: 'delete'; id: string };
