export interface Migration_toolEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Migration_toolQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Migration_toolAction18 = { type: 'create'; payload: Omit<Migration_toolEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Migration_toolEntity18> } | { type: 'delete'; id: string };
