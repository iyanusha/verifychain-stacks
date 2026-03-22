export interface Reward_distributionEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_distributionQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_distributionAction58 = { type: 'create'; payload: Omit<Reward_distributionEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_distributionEntity58> } | { type: 'delete'; id: string };
