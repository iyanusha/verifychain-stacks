export interface Validator_leaderboardEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Validator_leaderboardQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Validator_leaderboardAction8 = { type: 'create'; payload: Omit<Validator_leaderboardEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Validator_leaderboardEntity8> } | { type: 'delete'; id: string };
