export interface Data_integrityEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_integrityQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_integrityAction68 = { type: 'create'; payload: Omit<Data_integrityEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_integrityEntity68> } | { type: 'delete'; id: string };
