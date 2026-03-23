export interface Data_integrityEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_integrityQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_integrityAction18 = { type: 'create'; payload: Omit<Data_integrityEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_integrityEntity18> } | { type: 'delete'; id: string };
