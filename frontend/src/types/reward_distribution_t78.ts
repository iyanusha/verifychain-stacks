export interface Reward_distributionEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_distributionQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_distributionAction78 = { type: 'create'; payload: Omit<Reward_distributionEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_distributionEntity78> } | { type: 'delete'; id: string };
