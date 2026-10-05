import React from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import GlassCard from '@/components/shared/GlassCard';
import { THINKING_FORMULA, psychiatryFamily } from '@/components/education/educationModel';

export default function PsychiatryApproach() {
  const first = psychiatryFamily()[0];

  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader label="Подход" title="Как устроено обучение" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <GlassCard>
            <h4 className="font-semibold mb-4">Формула мышления</h4>
            <ol className="space-y-2">
              {THINKING_FORMULA.map((s, i) => (
                <li key={s} className="text-xs text-muted-foreground leading-relaxed flex gap-2.5">
                  <span className="font-mono text-primary/60 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </GlassCard>
          <GlassCard delay={0.05}>
            <h4 className="font-semibold mb-4">Кому подходит</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {first?.audience}
            </p>
            <p className="text-xs text-muted-foreground/70">
              Программа не готовит психолога к постановке диагнозов и не заменяет медицинское
              образование. Её задача — видеть случай целиком и понимать, что делать дальше.
            </p>
          </GlassCard>
          <GlassCard delay={0.1}>
            <h4 className="font-semibold mb-4">Содержание и практика</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Обучение строится вокруг разбора случаев: наблюдение, формулировка гипотез, выбор
              следующего шага. Практические форматы и формы проверки определяются программой каждой
              ступени.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Полный учебно-методический план каждой ступени — в разделе{' '}
              <a href="#plan" className="text-primary underline underline-offset-4">«Учебный план»</a> ниже.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}