export interface Validator_leaderboardEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Validator_leaderboardQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Validator_leaderboardAction78 = { type: 'create'; payload: Omit<Validator_leaderboardEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Validator_leaderboardEntity78> } | { type: 'delete'; id: string };
