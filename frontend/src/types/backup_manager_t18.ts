export interface Backup_managerEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Backup_managerQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Backup_managerAction18 = { type: 'create'; payload: Omit<Backup_managerEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Backup_managerEntity18> } | { type: 'delete'; id: string };
