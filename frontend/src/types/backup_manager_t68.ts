export interface Backup_managerEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Backup_managerQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Backup_managerAction68 = { type: 'create'; payload: Omit<Backup_managerEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Backup_managerEntity68> } | { type: 'delete'; id: string };
