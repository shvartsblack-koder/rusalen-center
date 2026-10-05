import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/shared/SectionHeader';
import ProgramStatusCard from './ProgramStatusCard';
import { activePrograms, announcedPrograms } from './educationModel';

export default function StudyNowSection() {
  const active = activePrograms();
  const announced = announcedPrograms();

  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Каталог"
          title="Что можно изучать сейчас"
          description="Сначала — программы с подтверждённым содержанием. Направления в подготовке показаны ниже кратко: их параметры уточняются."
        />
        {active.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            {active.map((p) => (
              <ProgramStatusCard key={p.id} program={p} />
            ))}
          </div>
        )}
        {announced.length > 0 && (
          <div className="mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
              <h3 className="font-display text-lg font-semibold">Направления в подготовке</h3>
              <Link
                to="/education/programs"
                className="text-xs text-primary underline underline-offset-4 hover:opacity-80"
              >
                Все направления
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {announced.map((p) => (
                <span
                  key={p.id}
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider border border-border/60 rounded px-3 py-1.5 text-muted-foreground"
                >
                  {p.shortTitle || p.title}
                  {p.hours?.total ? (
                    <span className="text-primary/80">{p.hours.total} ч</span>
                  ) : (
                    <span className="text-muted-foreground/50">часы уточняются</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}