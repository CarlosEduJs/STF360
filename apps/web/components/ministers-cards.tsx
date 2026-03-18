'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { getAllMinistersSummary, formatAppointmentDate, yearsOnCourt } from '@/lib/data/mock-data';
import { useQueryState } from 'nuqs';
import type { MinisterSummary } from '@/types';

const ministers = getAllMinistersSummary();

const positions = [...new Set(ministers.map((m) => m.position))];
const appointedByOptions = [...new Set(ministers.map((m) => m.appointedBy))];

export default function MinistersCards() {
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useQueryState('position', { defaultValue: 'Todos os cargos' });
  const [appointedByFilter, setAppointedByFilter] = useQueryState('appointedBy', { defaultValue: 'Todos' });

  const filtered = useMemo(() => {
    return ministers.filter((m) => {
      const matchesSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.birthState.toLowerCase().includes(search.toLowerCase());

      const matchesPosition =
        positionFilter === 'Todos os cargos' || m.position === positionFilter;

      const matchesAppointedBy =
        appointedByFilter === 'Todos' || m.appointedBy === appointedByFilter;

      return matchesSearch && matchesPosition && matchesAppointedBy;
    });
  }, [search, positionFilter, appointedByFilter]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1.5 flex-1 min-w-48">
          <label htmlFor="search-minister" className="text-xs text-muted-foreground">
            Buscar ministro
          </label>
          <Input
            id="search-minister"
            placeholder="Nome ou estado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground">Cargo</label>
          <Select value={positionFilter} onValueChange={(v) => setPositionFilter(v ?? 'Todos os cargos')}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os cargos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos os cargos">Todos os cargos</SelectItem>
              {positions.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground">Indicado por</label>
          <Select value={appointedByFilter} onValueChange={(v) => setAppointedByFilter(v ?? 'Todos')}>
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {appointedByOptions.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} de {ministers.length} ministros
      </p>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Nenhum ministro encontrado com os filtros selecionados.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((minister) => (
            <MinisterCard key={minister.id} minister={minister} />
          ))}
        </div>
      )}
    </div>
  );
}

function MinisterCard({ minister }: { minister: MinisterSummary }) {
  return (
    <Link href={`/ministro/${minister.id}`}>
      <Card className="h-full transition-shadow hover:ring-2 hover:ring-ring/30 cursor-pointer">
        <CardHeader>
          <Avatar>
            <AvatarImage src={minister.photoUrl} />
            <AvatarFallback>{minister.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <CardTitle>{minister.name}</CardTitle>
          <CardDescription>{minister.position}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1.5">
            <Detail label="Indicado por" value={minister.appointedBy} />
            <Detail label="Posse" value={formatAppointmentDate(minister.appointedAt)} />
            <Detail label="Tempo no STF" value={`${yearsOnCourt(minister.appointedAt)} anos`} />
            <Detail label="Naturalidade" value={minister.birthState} />
            <Detail label="Formação" value={minister.education} />
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-xs text-muted-foreground">Ver perfil completo →</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}