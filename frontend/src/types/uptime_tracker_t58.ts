export interface Uptime_trackerEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Uptime_trackerQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Uptime_trackerAction58 = { type: 'create'; payload: Omit<Uptime_trackerEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Uptime_trackerEntity58> } | { type: 'delete'; id: string };
