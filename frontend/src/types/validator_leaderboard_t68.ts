export interface Validator_leaderboardEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Validator_leaderboardQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Validator_leaderboardAction68 = { type: 'create'; payload: Omit<Validator_leaderboardEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Validator_leaderboardEntity68> } | { type: 'delete'; id: string };
