export interface Health_checkEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Health_checkQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Health_checkAction18 = { type: 'create'; payload: Omit<Health_checkEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Health_checkEntity18> } | { type: 'delete'; id: string };
