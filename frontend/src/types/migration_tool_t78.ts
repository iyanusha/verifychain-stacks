export interface Migration_toolEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Migration_toolQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Migration_toolAction78 = { type: 'create'; payload: Omit<Migration_toolEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Migration_toolEntity78> } | { type: 'delete'; id: string };
