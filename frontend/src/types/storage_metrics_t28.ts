export interface Storage_metricsEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Storage_metricsQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Storage_metricsAction28 = { type: 'create'; payload: Omit<Storage_metricsEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Storage_metricsEntity28> } | { type: 'delete'; id: string };
