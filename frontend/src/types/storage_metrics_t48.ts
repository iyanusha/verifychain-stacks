export interface Storage_metricsEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Storage_metricsQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Storage_metricsAction48 = { type: 'create'; payload: Omit<Storage_metricsEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Storage_metricsEntity48> } | { type: 'delete'; id: string };
