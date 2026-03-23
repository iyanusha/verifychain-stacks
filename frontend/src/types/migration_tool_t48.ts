export interface Migration_toolEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Migration_toolQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Migration_toolAction48 = { type: 'create'; payload: Omit<Migration_toolEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Migration_toolEntity48> } | { type: 'delete'; id: string };
