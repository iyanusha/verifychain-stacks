export function stake_managementFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function stake_managementValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const STAKE_MANAGEMENT_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
