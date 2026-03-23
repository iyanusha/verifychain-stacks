export interface Migration_toolEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Migration_toolQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Migration_toolAction8 = { type: 'create'; payload: Omit<Migration_toolEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Migration_toolEntity8> } | { type: 'delete'; id: string };
