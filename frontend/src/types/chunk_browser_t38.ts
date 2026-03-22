export interface Chunk_browserEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Chunk_browserQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Chunk_browserAction38 = { type: 'create'; payload: Omit<Chunk_browserEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Chunk_browserEntity38> } | { type: 'delete'; id: string };
