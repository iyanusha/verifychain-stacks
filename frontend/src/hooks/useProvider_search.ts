"use client";
import { useState, useCallback, useEffect } from 'react';

interface Provider_searchState { data: unknown; loading: boolean; error: string | null; }

export function useProvider_search() {
  const [state, setState] = useState<Provider_searchState>({ data: null, loading: false, error: null });

  const fetch = useCallback(async () => {
    setState(p => ({ ...p, loading: true, error: null }));
    try {
      setState(p => ({ ...p, data: {}, loading: false }));
    } catch (err) {
      setState(p => ({ ...p, error: err instanceof Error ? err.message : 'Failed', loading: false }));
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { ...state, refetch: fetch };
}
