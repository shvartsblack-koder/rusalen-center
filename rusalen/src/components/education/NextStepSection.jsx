import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { DPO_EMAIL, mailtoHref } from '@/lib/mailto';

export default function NextStepSection() {
  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Следующий шаг"
          title="Выбрать программу или задать вопрос"
          description="Напишите, какая профессиональная задача стоит перед вами: координатор поможет разобраться в вариантах подготовки."
        />
        <div className="flex flex-wrap gap-4 mt-8">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80">
            <Link to="/education/programs">
              Выбрать программу <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary/40 hover:bg-primary/10">
            <a href={mailtoHref('ДПО РУСАЛЕН — вопрос об обучении')}>
              <Mail className="w-4 h-4" aria-hidden="true" /> Задать вопрос координатору
            </a>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-primary/70" aria-hidden="true" /> {DPO_EMAIL}
          </span>
          <a href="tel:+74951815650" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5 text-primary/70" aria-hidden="true" /> +7 (495) 181-56-50
          </a>
        </div>
        <p className="text-xs text-muted-foreground/50 mt-8">
          АНО «Международный исследовательский центр РУСАЛЕН» · ИНН 7736341108 · ОГРН 1227700255408 · Лицензия на образовательную деятельность № Л035-01298-77/01005950 от 22.12.2023
        </p>
      </div>
    </section>
  );
}