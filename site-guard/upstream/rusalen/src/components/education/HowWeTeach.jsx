import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/shared/SectionHeader';
import GlassCard from '@/components/shared/GlassCard';
import { SYSTEM_FORMULA } from './educationModel';

const steps = [
  {
    num: '01',
    title: 'Понять задачу',
    text: 'Обучение начинается с профессиональной задачи: что вы хотите уметь делать в своей работе.',
  },
  {
    num: '02',
    title: 'Выбрать подходящий инструмент',
    text: 'Осваиваем методы с пониманием их возможностей и ограничений — под задачу, а не ради метода.',
  },
  {
    num: '03',
    title: 'Практика и обратная связь',
    text: 'Разбор случаев, задания и обсуждение решений: знания проверяются действием.',
  },
];

export default function HowWeTeach() {
  return (
    <section id="how-we-teach" className="py-16 border-t border-border/40 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Как мы учим"
          title="Понять задачу → выбрать инструмент → практика"
        />
        <div className="relative glass rounded-xl p-5 sm:p-6 mb-10 border-primary/30 overflow-hidden">
          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00E5A0] to-[#0090E8]" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-2">
            Модульность — наше ключевое преимущество
          </p>
          <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
            Обучение модульное: программа собирается из учебных блоков, а освоенный блок
            подтверждается один раз и перезачитывается в следующих маршрутах —{' '}
            <span className="text-gold-gradient font-semibold">
              вы не проходите пройденное дважды и собираете свой маршрут без лишних часов
            </span>
            .
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {steps.map((s, i) => (
            <GlassCard key={s.num} delay={i * 0.08}>
              <span className="font-mono text-3xl text-primary/30 mb-3 block">{s.num}</span>
              <h4 className="font-semibold mb-2">{s.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
            </GlassCard>
          ))}
        </div>
        <div className="glass rounded-xl p-6 mt-8 border-primary/20">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">
            Система обучения
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1">
            {SYSTEM_FORMULA.map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && <span className="text-primary/60">→</span>}
                <span>{s}</span>
              </React.Fragment>
            ))}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-4">
            Связи программ и учебных блоков можно изучить на интерактивной карте —{' '}
            <Link to="/education/visualization" className="text-primary underline underline-offset-4 hover:opacity-80">
              посмотреть связи программ
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}