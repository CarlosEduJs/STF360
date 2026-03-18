'use client';

import { useFetch } from './use-fetch';
import type { NewsItem } from '@/types';

interface NewsResponse {
  ministerId: string;
  ministerName: string;
  count: number;
  news: NewsItem[];
  _mock?: boolean;
}

interface UseMinisterNewsOptions {
  limit?: number;
  enabled?: boolean;
}

/**
 * Hook para buscar notícias de um ministro.
 *
 * Uso:
 *   const { news, isLoading, error } = useMinisterNews('ministro-alpha');
 *   const { news } = useMinisterNews('ministro-alpha', { limit: 3 });
 */
export function useMinisterNews(ministerId: string, options: UseMinisterNewsOptions = {}) {
  const { limit = 5, enabled = true } = options;

  const isValid = enabled && !!ministerId && ministerId !== 'undefined';

  const params = new URLSearchParams();
  if (limit !== 5) params.set('limit', String(limit));

  const query = params.toString();
  const url = isValid ? `/api/news/${ministerId}${query ? `?${query}` : ''}` : null;

  const { data, isLoading, error, refetch } = useFetch<NewsResponse>(url);

  return {
    news: data?.news ?? [],
    ministerName: data?.ministerName ?? null,
    count: data?.count ?? 0,
    isMock: data?._mock ?? false,
    isLoading,
    error,
    refetch,
  };
}
