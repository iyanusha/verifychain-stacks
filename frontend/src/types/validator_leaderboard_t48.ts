export interface Validator_leaderboardEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Validator_leaderboardQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Validator_leaderboardAction48 = { type: 'create'; payload: Omit<Validator_leaderboardEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Validator_leaderboardEntity48> } | { type: 'delete'; id: string };
