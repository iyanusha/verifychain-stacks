export interface Health_checkEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Health_checkQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Health_checkAction78 = { type: 'create'; payload: Omit<Health_checkEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Health_checkEntity78> } | { type: 'delete'; id: string };
