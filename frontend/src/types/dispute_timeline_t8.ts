export interface Dispute_timelineEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Dispute_timelineQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Dispute_timelineAction8 = { type: 'create'; payload: Omit<Dispute_timelineEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Dispute_timelineEntity8> } | { type: 'delete'; id: string };
