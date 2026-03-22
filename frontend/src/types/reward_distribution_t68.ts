export interface Reward_distributionEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_distributionQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_distributionAction68 = { type: 'create'; payload: Omit<Reward_distributionEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_distributionEntity68> } | { type: 'delete'; id: string };
