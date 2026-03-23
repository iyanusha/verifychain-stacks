export interface Validator_leaderboardEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Validator_leaderboardQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Validator_leaderboardAction38 = { type: 'create'; payload: Omit<Validator_leaderboardEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Validator_leaderboardEntity38> } | { type: 'delete'; id: string };
