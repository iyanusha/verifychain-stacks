export interface Migration_toolEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Migration_toolQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Migration_toolAction58 = { type: 'create'; payload: Omit<Migration_toolEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Migration_toolEntity58> } | { type: 'delete'; id: string };
