export interface Backup_managerEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Backup_managerQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Backup_managerAction58 = { type: 'create'; payload: Omit<Backup_managerEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Backup_managerEntity58> } | { type: 'delete'; id: string };
