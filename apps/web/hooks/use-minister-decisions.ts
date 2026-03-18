'use client';

import { useFetch } from './use-fetch';
import type { Decision } from '@/types';

interface DecisionsResponse {
  ministerId: string;
  ministerName: string;
  count: number;
  decisions: Decision[];
  _mock?: boolean;
}

interface UseMinisterDecisionsOptions {
  limit?: number;
  type?: string;
  enabled?: boolean;
}

/**
 * Hook para buscar decisões de um ministro.
 *
 * Uso:
 *   const { decisions, isLoading, error } = useMinisterDecisions('ministro-alpha');
 *   const { decisions } = useMinisterDecisions('ministro-alpha', { limit: 3, type: 'Habeas Corpus' });
 */
export function useMinisterDecisions(ministerId: string, options: UseMinisterDecisionsOptions = {}) {
  const { limit = 5, type, enabled = true } = options;

  const isValid = enabled && !!ministerId && ministerId !== 'undefined';

  const params = new URLSearchParams();
  if (limit !== 5) params.set('limit', String(limit));
  if (type) params.set('type', type);

  const query = params.toString();
  const url = isValid ? `/api/decisions/${ministerId}${query ? `?${query}` : ''}` : null;

  const { data, isLoading, error, refetch } = useFetch<DecisionsResponse>(url);

  return {
    decisions: data?.decisions ?? [],
    ministerName: data?.ministerName ?? null,
    count: data?.count ?? 0,
    isMock: data?._mock ?? false,
    isLoading,
    error,
    refetch,
  };
}
