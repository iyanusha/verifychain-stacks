export interface Reward_distributionEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_distributionQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_distributionAction28 = { type: 'create'; payload: Omit<Reward_distributionEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_distributionEntity28> } | { type: 'delete'; id: string };
