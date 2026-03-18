/**
 * API Route de notícias — Obs:retorna dados mock durante o desenvolvimento.
 *
 * Para integrar com o Google News RSS real, será necessário substituir o corpo da função
 * pelo código de scraping/parsing do RSS, mantendo o formato de resposta.
 *
 * Exemplo de chamada:
 *   GET /api/news/alexandre-de-moraes
 *   GET /api/news/edson-fachin?limit=3
 */

import { NextRequest, NextResponse } from 'next/server';
import { getMinisterNews, getMinisterById, getAllMinisterIds } from '@/lib/data/mock-data';

export const revalidate = 3600; // 1 hora em segundos
export const dynamic = 'force-static';
export const dynamicParams = false; // Apenas IDs em generateStaticParams são válidos

// pré-geração de caminhos para todos os ministros conhecidos.
export function generateStaticParams() {
  return getAllMinisterIds();
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const minister = getMinisterById(params.id);

  if (!minister) {
    return NextResponse.json(
      { error: `Ministro "${params.id}" não encontrado.` },
      { status: 404 }
    );
  }

  const limitParam = request.nextUrl.searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 5;

  const news = getMinisterNews(params.id, limit);

  return NextResponse.json({
    ministerId: params.id,
    ministerName: minister.name,
    count: news.length,
    news,
    // Indica que os dados são mock -> remover em produção
    _mock: true,
  });
}