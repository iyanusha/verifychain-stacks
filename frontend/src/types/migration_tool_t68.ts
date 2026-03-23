export interface Migration_toolEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Migration_toolQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Migration_toolAction68 = { type: 'create'; payload: Omit<Migration_toolEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Migration_toolEntity68> } | { type: 'delete'; id: string };
