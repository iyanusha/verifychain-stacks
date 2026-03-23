export interface Chunk_browserEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Chunk_browserQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Chunk_browserAction68 = { type: 'create'; payload: Omit<Chunk_browserEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Chunk_browserEntity68> } | { type: 'delete'; id: string };
