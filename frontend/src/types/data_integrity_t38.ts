export interface Data_integrityEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_integrityQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_integrityAction38 = { type: 'create'; payload: Omit<Data_integrityEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_integrityEntity38> } | { type: 'delete'; id: string };
