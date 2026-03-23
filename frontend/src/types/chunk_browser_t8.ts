export interface Chunk_browserEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Chunk_browserQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Chunk_browserAction8 = { type: 'create'; payload: Omit<Chunk_browserEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Chunk_browserEntity8> } | { type: 'delete'; id: string };
