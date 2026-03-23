export interface Health_checkEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Health_checkQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Health_checkAction38 = { type: 'create'; payload: Omit<Health_checkEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Health_checkEntity38> } | { type: 'delete'; id: string };
