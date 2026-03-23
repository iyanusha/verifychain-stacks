export interface Data_integrityEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_integrityQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_integrityAction78 = { type: 'create'; payload: Omit<Data_integrityEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_integrityEntity78> } | { type: 'delete'; id: string };
