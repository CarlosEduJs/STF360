'use client';

import { useFetch } from './use-fetch';
import type { MinisterSummary } from '@/types';

interface MinistersResponse {
  count: number;
  ministers: MinisterSummary[];
  _mock?: boolean;
}

/**
 * Hook para buscar a lista de ministros (resumo).
 *
 * Uso:
 *   const { ministers, isLoading, error } = useMinisters();
 */
export function useMinisters() {
  const { data, isLoading, error, refetch } = useFetch<MinistersResponse>('/api/ministers');

  return {
    ministers: data?.ministers ?? [],
    count: data?.count ?? 0,
    isMock: data?._mock ?? false,
    isLoading,
    error,
    refetch,
  };
}
