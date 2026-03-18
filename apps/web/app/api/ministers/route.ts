/**
 * API Route de ministros — lista resumida para a homepage.
 *
 * Exemplo de chamada:
 *   GET /api/ministers
 */

import { NextResponse } from 'next/server';
import { getAllMinistersSummary } from '@/lib/data/mock-data';

export const revalidate = 86400; // 24 horas em segundos

export async function GET() {
  const ministers = getAllMinistersSummary();

  return NextResponse.json({
    count: ministers.length,
    ministers,
    _mock: true,
  });
}
