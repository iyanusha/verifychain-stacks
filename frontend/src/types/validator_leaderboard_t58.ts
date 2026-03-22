export interface Validator_leaderboardEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Validator_leaderboardQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Validator_leaderboardAction58 = { type: 'create'; payload: Omit<Validator_leaderboardEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Validator_leaderboardEntity58> } | { type: 'delete'; id: string };
