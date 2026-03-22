export interface Dispute_timelineEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Dispute_timelineQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Dispute_timelineAction68 = { type: 'create'; payload: Omit<Dispute_timelineEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Dispute_timelineEntity68> } | { type: 'delete'; id: string };
