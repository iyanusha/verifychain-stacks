export interface Chunk_browserEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Chunk_browserQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Chunk_browserAction58 = { type: 'create'; payload: Omit<Chunk_browserEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Chunk_browserEntity58> } | { type: 'delete'; id: string };
