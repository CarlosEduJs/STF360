'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { useMinisterNews } from '@/hooks';
import { getAllMinistersSummary } from '@/lib/data/mock-data';

const ministers = getAllMinistersSummary();
const ministerIds = new Set(ministers.map((m) => m.id));
const defaultMinisterId = ministers[0]?.id ?? '';

export default function LatestNews() {
  const [selectedMinister, setSelectedMinister] = useQueryState('ministro', parseAsString.withDefault(defaultMinisterId));

  const validId = ministerIds.has(selectedMinister) ? selectedMinister : defaultMinisterId;

  const { news, ministerName, isLoading, error } = useMinisterNews(validId, {
    enabled: !!validId,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">Últimas Notícias</h2>
          <p className="text-xs text-muted-foreground">
            Notícias recentes sobre o ministro selecionado, via Google News.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground">Ministro</label>
          <Select
            value={selectedMinister}
            onValueChange={(v) => setSelectedMinister(v ?? ministers[0]?.id ?? '')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um ministro" />
            </SelectTrigger>
            <SelectContent>
              {ministers.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground py-4 text-center">Carregando notícias...</p>
      )}

      {error && (
        <p className="text-sm text-destructive py-4 text-center">{error}</p>
      )}

      {!isLoading && !error && news.length === 0 && (
        <p className="text-sm text-muted-foreground py-4 text-center">
          Nenhuma notícia encontrada para {ministerName ?? 'este ministro'}.
        </p>
      )}

      {!isLoading && news.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer">
              <Card className="h-full transition-shadow hover:ring-2 hover:ring-ring/30 cursor-pointer">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.source}</CardDescription>
                </CardHeader>
                <CardContent>
                  <time className="text-muted-foreground">
                    {new Date(item.publishedAt).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
