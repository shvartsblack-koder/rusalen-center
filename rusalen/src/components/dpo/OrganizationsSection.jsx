import React from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';
import { mailtoHref } from '@/lib/mailto';

export default function OrganizationsSection() {
  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Для организаций"
          title="Подготовка под задачи вашей команды"
          description="Готовы обсуждать разработку подготовки для медицинских, санаторно-курортных и ведомственных организаций. Сначала определяем задачи сотрудников и требования к их работе, затем — содержание обучения, практику и способы проверки навыков."
        />
        <div className="glass rounded-xl p-6 sm:p-8 max-w-3xl mt-8">
          <Building2 className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
          <h4 className="font-semibold mb-2">
            Клиническая психология и психофизиологическая коррекция
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Разрабатываем концепцию углублённой подготовки для специалистов, работающих с
            последствиями высокой нагрузки: клинико-психологическая и профессиональная диагностика,
            БОС, гипноз и другие методы ПФК. Для среднего медицинского персонала возможна отдельная
            прикладная подготовка в пределах его обязанностей.
          </p>
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] border border-accent/40 text-accent rounded px-2 py-0.5 mb-6">
            Концепция для совместной разработки
          </span>
          <div>
            <Button asChild variant="outline" className="border-primary/40 hover:bg-primary/10">
              <a href={mailtoHref('РУСАЛЕН — подготовка сотрудников организации')}>
                Обсудить подготовку команды
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}