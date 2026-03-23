export interface Backup_managerEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Backup_managerQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Backup_managerAction78 = { type: 'create'; payload: Omit<Backup_managerEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Backup_managerEntity78> } | { type: 'delete'; id: string };
