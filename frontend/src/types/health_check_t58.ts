export interface Health_checkEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Health_checkQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Health_checkAction58 = { type: 'create'; payload: Omit<Health_checkEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Health_checkEntity58> } | { type: 'delete'; id: string };
