export interface Validator_leaderboardEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Validator_leaderboardQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Validator_leaderboardAction18 = { type: 'create'; payload: Omit<Validator_leaderboardEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Validator_leaderboardEntity18> } | { type: 'delete'; id: string };
