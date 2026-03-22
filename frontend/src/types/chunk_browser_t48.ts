export interface Chunk_browserEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Chunk_browserQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Chunk_browserAction48 = { type: 'create'; payload: Omit<Chunk_browserEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Chunk_browserEntity48> } | { type: 'delete'; id: string };
