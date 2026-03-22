export interface Dispute_timelineEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Dispute_timelineQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Dispute_timelineAction38 = { type: 'create'; payload: Omit<Dispute_timelineEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Dispute_timelineEntity38> } | { type: 'delete'; id: string };
