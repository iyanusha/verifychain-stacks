export interface Validator_leaderboardEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Validator_leaderboardQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Validator_leaderboardAction28 = { type: 'create'; payload: Omit<Validator_leaderboardEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Validator_leaderboardEntity28> } | { type: 'delete'; id: string };
