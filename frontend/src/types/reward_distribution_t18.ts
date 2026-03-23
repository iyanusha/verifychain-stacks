export interface Reward_distributionEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_distributionQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_distributionAction18 = { type: 'create'; payload: Omit<Reward_distributionEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_distributionEntity18> } | { type: 'delete'; id: string };
