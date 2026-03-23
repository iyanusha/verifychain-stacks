export interface Storage_metricsEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Storage_metricsQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Storage_metricsAction78 = { type: 'create'; payload: Omit<Storage_metricsEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Storage_metricsEntity78> } | { type: 'delete'; id: string };
