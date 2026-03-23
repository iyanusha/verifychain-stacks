export interface Migration_toolEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Migration_toolQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Migration_toolAction38 = { type: 'create'; payload: Omit<Migration_toolEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Migration_toolEntity38> } | { type: 'delete'; id: string };
