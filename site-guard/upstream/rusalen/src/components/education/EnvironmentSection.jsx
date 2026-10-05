import React from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import GlassCard from '@/components/shared/GlassCard';
import { Users } from 'lucide-react';

const formats = [
  ['Разбор случаев', 'Регулярная работа с реальными и учебными случаями в группе.'],
  ['Интервизия', 'Взаимное обсуждение практики между коллегами.'],
  ['Супервизия', 'Разбор сложных случаев с опытным ведущим.'],
  ['Вебинары', 'Тематические встречи и обсуждение актуальных вопросов.'],
  ['Ассоциация «Клинический навигатор»', 'Профессиональное сообщество вокруг всей системы обучения.'],
];

export default function EnvironmentSection() {
  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Профессиональная среда"
          title="Курс заканчивается — среда остаётся"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {formats.map(([title, text], i) => (
            <GlassCard key={title} delay={(i % 3) * 0.08}>
              <Users className="w-4 h-4 text-primary mb-3" aria-hidden="true" />
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
            </GlassCard>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/60 mt-8 max-w-2xl">
          Участие в среде добровольное. Условия вступления, доступные встречи и формат работы
          сообщаются отдельно. Участие в ассоциации и доступ к материалам завершённого курса
          регулируются раздельно.
        </p>
      </div>
    </section>
  );
}