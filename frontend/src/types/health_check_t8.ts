export interface Health_checkEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Health_checkQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Health_checkAction8 = { type: 'create'; payload: Omit<Health_checkEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Health_checkEntity8> } | { type: 'delete'; id: string };
