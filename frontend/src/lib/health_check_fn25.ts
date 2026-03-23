export function health_checkTransform25<T extends Record<string, number>>(input: T): { keys: string[]; values: number[]; total: number; avg: number } {
  const keys = Object.keys(input);
  const values = Object.values(input);
  const total = values.reduce((a, b) => a + b, 0);
  return { keys, values, total, avg: values.length ? total / values.length : 0 };
}
export function health_checkFilter25<T>(items: T[], predicate: (item: T) => boolean): { matched: T[]; rejected: T[]; count: number } {
  const matched = items.filter(predicate);
  return { matched, rejected: items.filter(i => !predicate(i)), count: matched.length };
}
export const HEALTH_CHECK_V25 = { version: '1.25.0', build: 25 } as const;
