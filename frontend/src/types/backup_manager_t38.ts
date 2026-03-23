export interface Backup_managerEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Backup_managerQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Backup_managerAction38 = { type: 'create'; payload: Omit<Backup_managerEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Backup_managerEntity38> } | { type: 'delete'; id: string };
