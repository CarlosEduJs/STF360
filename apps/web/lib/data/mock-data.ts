/**
 * mock-data.ts
 *
 * Helper de acesso aos dados mock dos ministros do STF.
 * Essas funções apenas rodam o JSON estatico, data.ts chama os dados reais.
 *
 * Uso:
 *   import { getAllMinisters, getMinisterById, getMinisterNews } from '@/lib/data/mock-data'
 */

import ministersData from '@/data/ministers.json';
import type { Minister, MinisterSummary, NewsItem, Decision } from '@/types';

const ministers = ministersData as Minister[];

// Funções de acesso aos ministros

/**
 * Retorna todos os ministros com dados completos.
 */
export function getAllMinisters(): Minister[] {
  return ministers;
}

/**
 * Retorna todos os ministros sem news e decisions (para a homepage).
 * Evita carregar dados desnecessários na listagem.
 */
export function getAllMinistersSummary(): MinisterSummary[] {
  return ministers.map(({ news, decisions, bio, ...summary }) => summary);
}

/**
 * Retorna um ministro pelo seu ID (slug).
 * Retorna undefined se não encontrado.
 */
export function getMinisterById(id: string): Minister | undefined {
  return ministers.find((m) => m.id === id);
}

/**
 * Retorna todos os IDs dos ministros.
 * Útil para generateStaticParams() no Next.js App Router.
 */
export function getAllMinisterIds(): { id: string }[] {
  return ministers.map((m) => ({ id: m.id }));
}

// Funções de acesso às notícias

/**
 * Retorna as notícias de um ministro pelo ID.
 * Aceita um parâmetro opcional `limit` para paginar.
 *
 * TODO para data real: substituir por chamada real ao Google News RSS:
 *   GET /api/news/[id]
 */
export function getMinisterNews(id: string, limit = 5): NewsItem[] {
  const minister = getMinisterById(id);
  if (!minister) return [];
  return minister.news.slice(0, limit);
}

// Funções de acesso às decisões

/**
 * Retorna as decisões de um ministro pelo ID.
 * Aceita um parâmetro opcional `limit` para paginar.
 *
 * TODO para data real: substituir por chamada real ao portal de jurisprudência do STF:
 *   GET /api/decisions/[id]
 */
export function getMinisterDecisions(id: string, limit = 5): Decision[] {
  const minister = getMinisterById(id);
  if (!minister) return [];
  return minister.decisions.slice(0, limit);
}

/**
 * Filtra decisões de um ministro por tipo.
 * Ex: getDecisionsByType('alexandre-de-moraes', 'Habeas Corpus')
 */
export function getDecisionsByType(id: string, type: string): Decision[] {
  const decisions = getMinisterDecisions(id, 100);
  return decisions.filter((d) =>
    d.type.toLowerCase().includes(type.toLowerCase())
  );
}

// Funções utilitárias

/**
 * Agrupa ministros por quem os indicou.
 * Útil para visualizações e filtros.
 */
export function groupByAppointedBy(): Record<string, MinisterSummary[]> {
  const summaries = getAllMinistersSummary();
  return summaries.reduce<Record<string, MinisterSummary[]>>((acc, minister) => {
    const key = minister.appointedBy;
    if (!acc[key]) acc[key] = [];
    acc[key].push(minister);
    return acc;
  }, {});
}

/**
 * Formata a data de posse para exibição em português.
 * Ex: "2017-02-22" → "22 de fevereiro de 2017"
 */
export function formatAppointmentDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Calcula quantos anos um ministro está no STF.
 */
export function yearsOnCourt(appointedAt: string): number {
  const start = new Date(appointedAt);
  const now = new Date();
  const diff = now.getFullYear() - start.getFullYear();
  const hasBirthdayPassed =
    now.getMonth() > start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());
  return hasBirthdayPassed ? diff : diff - 1;
}

/**
 * Retorna a cor de badge para o resultado de uma decisão.
 */
export function outcomeColor(outcome: string): string {
  const o = outcome.toLowerCase();
  if (o.includes('deferido') || o.includes('procedente') || o.includes('provido')) {
    return 'bg-green-100 text-green-800';
  }
  if (o.includes('indeferido') || o.includes('improcedente') || o.includes('improvido')) {
    return 'bg-red-100 text-red-800';
  }
  if (o.includes('parcial')) {
    return 'bg-yellow-100 text-yellow-800';
  }
  return 'bg-gray-100 text-gray-700';
}