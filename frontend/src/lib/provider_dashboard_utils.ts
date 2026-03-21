export function provider_dashboardFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function provider_dashboardValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const PROVIDER_DASHBOARD_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
