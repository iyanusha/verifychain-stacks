export interface Reward_distributionEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_distributionQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_distributionAction38 = { type: 'create'; payload: Omit<Reward_distributionEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_distributionEntity38> } | { type: 'delete'; id: string };
