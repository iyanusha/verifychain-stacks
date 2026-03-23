export interface Backup_managerEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Backup_managerQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Backup_managerAction48 = { type: 'create'; payload: Omit<Backup_managerEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Backup_managerEntity48> } | { type: 'delete'; id: string };
