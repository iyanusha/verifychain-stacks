export interface Uptime_trackerEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Uptime_trackerQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Uptime_trackerAction8 = { type: 'create'; payload: Omit<Uptime_trackerEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Uptime_trackerEntity8> } | { type: 'delete'; id: string };
