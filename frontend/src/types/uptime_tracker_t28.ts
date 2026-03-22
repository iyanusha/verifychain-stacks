export interface Uptime_trackerEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Uptime_trackerQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Uptime_trackerAction28 = { type: 'create'; payload: Omit<Uptime_trackerEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Uptime_trackerEntity28> } | { type: 'delete'; id: string };
