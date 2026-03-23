export interface Uptime_trackerEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Uptime_trackerQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Uptime_trackerAction78 = { type: 'create'; payload: Omit<Uptime_trackerEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Uptime_trackerEntity78> } | { type: 'delete'; id: string };
