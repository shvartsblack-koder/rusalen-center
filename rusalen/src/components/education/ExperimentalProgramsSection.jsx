import React from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import { Mail, Brain, Stethoscope, Activity } from 'lucide-react';
import { mailtoHref } from '@/lib/mailto';

const roles = [
  {
    icon: Brain,
    title: 'Нейрофизиолог',
    text: 'Опыт работы с психопатологией — для углублённой разработки клинических основ и психофизиологической диагностики.',
  },
  {
    icon: Stethoscope,
    title: 'Врач-невролог',
    text: 'Опыт работы с психопатологией — для развития программ клинических основ и БОС-терапии.',
  },
  {
    icon: Activity,
    title: 'Врач-эндокринолог',
    text: 'Опыт работы с психопатологией — для программ клинических основ и психофизиологической диагностики.',
  },
];

export default function ExperimentalProgramsSection() {
  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Экспериментальные программы"
          title="Программы формируются — можно влиять на их создание"
          description="Мы приглашаем специалистов к участию в программах, которые сейчас находятся в разработке. Это возможность встроить свой опыт в учебные планы на этапе их формирования."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {roles.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="glass rounded-xl p-6 hover:border-primary/20 transition-all duration-300 hover-breathe"
            >
              <Icon className="w-4 h-4 text-primary mb-3" aria-hidden="true" />
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-8 max-w-2xl">
          Сейчас нам особенно нужны коллеги с опытом работы с психопатологией для более глубокой
          проработки программ по клиническим основам, БОС-терапии и психофизиологической
          диагностике.
        </p>
        <a
          href={mailtoHref('Участие в экспериментальных программах ДПО РУСАЛЕН')}
          className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          Предложить своё участие
        </a>
      </div>
    </section>
  );
}