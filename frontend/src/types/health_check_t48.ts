export interface Health_checkEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Health_checkQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Health_checkAction48 = { type: 'create'; payload: Omit<Health_checkEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Health_checkEntity48> } | { type: 'delete'; id: string };
