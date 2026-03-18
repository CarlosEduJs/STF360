/**
 * API Route de decisões — Obs: Retorna dados mock durante o desenvolvimento.
 *
 * Exemplo de chamada:
 *   GET /api/decisions/alexandre-de-moraes
 *   GET /api/decisions/edson-fachin?limit=3&type=Habeas+Corpus
 */

import { NextRequest, NextResponse } from 'next/server';
import { getMinisterDecisions, getDecisionsByType, getMinisterById, getAllMinisterIds } from '@/lib/data/mock-data';

// Configurações de Segmento para Produção
export const revalidate = 86400; // 24 horas em segundos
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
  const typeParam = request.nextUrl.searchParams.get('type');
  const limit = limitParam ? parseInt(limitParam, 10) : 5;

  const decisions = typeParam
    ? getDecisionsByType(params.id, typeParam)
    : getMinisterDecisions(params.id, limit);

  return NextResponse.json({
    ministerId: params.id,
    ministerName: minister.name,
    count: decisions.length,
    decisions,
    // Indica que os dados são mock -> remover em produção
    _mock: true,
  });
}