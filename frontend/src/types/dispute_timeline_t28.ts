export interface Dispute_timelineEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Dispute_timelineQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Dispute_timelineAction28 = { type: 'create'; payload: Omit<Dispute_timelineEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Dispute_timelineEntity28> } | { type: 'delete'; id: string };
