export interface Data_integrityEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_integrityQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_integrityAction48 = { type: 'create'; payload: Omit<Data_integrityEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_integrityEntity48> } | { type: 'delete'; id: string };
