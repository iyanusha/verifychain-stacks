export interface Uptime_trackerEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Uptime_trackerQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Uptime_trackerAction48 = { type: 'create'; payload: Omit<Uptime_trackerEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Uptime_trackerEntity48> } | { type: 'delete'; id: string };
