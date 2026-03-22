export interface Data_integrityEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_integrityQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_integrityAction58 = { type: 'create'; payload: Omit<Data_integrityEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_integrityEntity58> } | { type: 'delete'; id: string };
