export interface Data_integrityEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_integrityQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_integrityAction8 = { type: 'create'; payload: Omit<Data_integrityEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_integrityEntity8> } | { type: 'delete'; id: string };
