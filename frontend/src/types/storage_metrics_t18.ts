export interface Storage_metricsEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Storage_metricsQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Storage_metricsAction18 = { type: 'create'; payload: Omit<Storage_metricsEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Storage_metricsEntity18> } | { type: 'delete'; id: string };
