export interface Backup_managerEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Backup_managerQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Backup_managerAction28 = { type: 'create'; payload: Omit<Backup_managerEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Backup_managerEntity28> } | { type: 'delete'; id: string };
