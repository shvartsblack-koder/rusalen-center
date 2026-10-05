import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/shared/SectionHeader';
import GlassCard from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import { mailtoHref } from '@/lib/mailto';
import { psychiatryFamily, creditPolicies } from '@/components/education/educationModel';

export default function PsychiatryEnroll() {
  const first = psychiatryFamily()[0];
  const documentText =
    first?.document || 'Удостоверение о повышении квалификации — по итогам итоговой аттестации';

  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader label="Условия и запись" title="Документ, условия и следующий шаг" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <GlassCard>
            <h4 className="font-semibold mb-3">Документ</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{documentText}</p>
            <p className="text-xs text-muted-foreground/60 mt-3">
              По каждой ступени маршрута — отдельное удостоверение.
            </p>
          </GlassCard>
          <GlassCard delay={0.05}>
            <h4 className="font-semibold mb-3">Условия набора</h4>
            <ul className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <li>Стоимость — уточняется</li>
              <li>Даты набора — уточняются</li>
              <li>Зачисление — по заявке; условия уточняются координатором</li>
            </ul>
          </GlassCard>
          <GlassCard delay={0.1}>
            <h4 className="font-semibold mb-3">Ранее освоенное</h4>
            {creditPolicies.map((c) => (
              <p key={c} className="text-xs text-muted-foreground/80 leading-relaxed mb-2">
                {c}
              </p>
            ))}
          </GlassCard>
        </div>
        <div className="flex flex-wrap gap-4 mt-10">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80">
            <a href={mailtoHref('ДПО РУСАЛЕН — Психиатрия для психологов — условия обучения')}>
              <Mail className="w-4 h-4" aria-hidden="true" /> Запросить условия обучения
            </a>
          </Button>
          <Button asChild variant="outline" className="border-primary/40 hover:bg-primary/10">
            <Link to="/education/programs">
              Каталог программ <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}