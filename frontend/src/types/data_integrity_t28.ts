export interface Data_integrityEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_integrityQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_integrityAction28 = { type: 'create'; payload: Omit<Data_integrityEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_integrityEntity28> } | { type: 'delete'; id: string };
