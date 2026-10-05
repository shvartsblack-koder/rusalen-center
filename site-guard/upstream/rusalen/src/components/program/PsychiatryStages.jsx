import React from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import { psychiatryFamily } from '@/components/education/educationModel';

export default function PsychiatryStages() {
  const family = psychiatryFamily();
  const total = family.reduce((s, p) => s + (p.hours?.total || 0), 0);
  const roman = ['I', 'II', 'III', 'IV', 'V'];

  return (
    <section id="stages" className="py-16 border-t border-border/40 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Структура"
          title="Две ступени — один маршрут"
          description="Каждая ступень — самостоятельная программа повышения квалификации со своим удостоверением. Полный маршрут складывается из последовательного освоения обеих."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {family.map((s) => (
            <div key={s.id} id={`stage-${s.stage}`} className="glass rounded-xl p-6 scroll-mt-32 flex flex-col">
              <span className="font-mono text-3xl text-primary/30 mb-3 block">
                {roman[s.stage - 1]}
              </span>
              <h4 className="font-semibold mb-2">{s.stageTitle}</h4>
              <p className="font-mono text-xs text-primary/80 mb-3">
                {s.hours?.total || '—'} ч · повышение квалификации
              </p>
              <p className="text-sm text-foreground/90 mb-4">{s.question}</p>
              {s.description && (
                <p className="text-xs text-muted-foreground leading-relaxed mt-auto">{s.description}</p>
              )}
            </div>
          ))}
        </div>
        <div className="glass rounded-xl p-6 mt-6 border-primary/20">
          <p className="font-display text-lg sm:text-xl mb-2">
            Полный маршрут — {total || '—'} часов
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            От наблюдения и навигации — к сложной дифференциальной формулировке случая и
            профессиональной тактике. Переход ко второй ступени опирается на освоение первой;
            условия перехода уточняются при записи.
          </p>
        </div>
      </div>
    </section>
  );
}