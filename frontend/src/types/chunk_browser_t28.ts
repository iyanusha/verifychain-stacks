export interface Chunk_browserEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Chunk_browserQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Chunk_browserAction28 = { type: 'create'; payload: Omit<Chunk_browserEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Chunk_browserEntity28> } | { type: 'delete'; id: string };
