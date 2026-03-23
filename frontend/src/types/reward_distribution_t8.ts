export interface Reward_distributionEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_distributionQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_distributionAction8 = { type: 'create'; payload: Omit<Reward_distributionEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_distributionEntity8> } | { type: 'delete'; id: string };
