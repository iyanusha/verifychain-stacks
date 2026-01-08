export function provider_hooksFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function provider_hooksValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const PROVIDER_HOOKS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
