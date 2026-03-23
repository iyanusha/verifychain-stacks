export interface Health_checkEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Health_checkQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Health_checkAction68 = { type: 'create'; payload: Omit<Health_checkEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Health_checkEntity68> } | { type: 'delete'; id: string };
