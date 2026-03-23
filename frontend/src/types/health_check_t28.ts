export interface Health_checkEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Health_checkQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Health_checkAction28 = { type: 'create'; payload: Omit<Health_checkEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Health_checkEntity28> } | { type: 'delete'; id: string };
