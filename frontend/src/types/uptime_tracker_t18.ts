export interface Uptime_trackerEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Uptime_trackerQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Uptime_trackerAction18 = { type: 'create'; payload: Omit<Uptime_trackerEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Uptime_trackerEntity18> } | { type: 'delete'; id: string };
