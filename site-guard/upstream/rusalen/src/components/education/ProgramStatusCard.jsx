import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROGRAM_STATUSES, hoursTextFor, documentLineFor } from './educationModel';
import { mailtoHref } from '@/lib/mailto';

export default function ProgramStatusCard({ program, className = '' }) {
  const status = PROGRAM_STATUSES[program.status];
  const hours = hoursTextFor(program);
  const documentLine = documentLineFor(program);

  return (
    <div
      className={`glass rounded-xl p-6 border-primary/30 relative overflow-hidden flex flex-col h-full ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] border border-primary/40 text-primary rounded px-2 py-0.5">
          {status.label}
        </span>
        {program.format && (
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.15em] border border-accent/40 text-accent rounded px-2 py-0.5">
            {program.format === 'ПК' ? 'Повышение квалификации' : 'Профпереподготовка'}
          </span>
        )}
      </div>
      <h3 className="font-display text-lg sm:text-xl font-bold mb-1">{program.title}</h3>
      {program.subtitle && <p className="text-sm text-primary/90 mb-3">{program.subtitle}</p>}
      {program.description && (
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">{program.description}</p>
      )}
      <p className="text-xs text-muted-foreground/80 flex items-center gap-1.5 mb-1">
        <Clock className="w-3.5 h-3.5 text-primary/80" aria-hidden="true" />
        {hours}
      </p>
      <p className="text-xs text-muted-foreground/70 flex items-center gap-1.5 mb-5">
        <Award className="w-3.5 h-3.5 text-primary/70" aria-hidden="true" />
        {documentLine}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-4">
        <span className="font-display text-lg font-bold text-gold-gradient">
          {program.pricing ? `${program.pricing.toLocaleString('ru-RU')} ₽` : 'Стоимость уточняется'}
        </span>
        {program.path && (
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80">
            <Link to={program.path}>Подробнее о программе</Link>
          </Button>
        )}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-primary/40 hover:bg-primary/10 text-xs"
        >
          <a href={mailtoHref(`ДПО РУСАЛЕН — ${program.title} — условия обучения`)}>
            Запросить условия
          </a>
        </Button>
      </div>
    </div>
  );
}