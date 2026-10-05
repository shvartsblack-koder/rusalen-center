import React from 'react';
import PageHero from '../../components/shared/PageHero';
import GlassCard from '../../components/shared/GlassCard';

const directions = [
  { title: 'Интегративная психология', desc: 'Синтез классических и современных подходов к пониманию человеческой психики. Объединение когнитивных, психоаналитических, гуманистических и нейронаучных парадигм.' },
  { title: 'Психосоматика', desc: 'Исследование взаимосвязей психических процессов и телесного здоровья. Разработка протоколов работы с психосоматическими состояниями.' },
  { title: 'Исследования сознания', desc: 'Картография состояний сознания, изучение изменённых состояний, медитативных практик и их нейрофизиологических коррелятов.' },
  { title: 'Цифровая психология', desc: 'Психика в цифровой среде: цифровой аутизм, эготизм, зависимости от технологий, адаптация к VR/AR.' },
  { title: 'Искусственный интеллект и психика', desc: 'Формирование кибернетической психологии Artificial Ego. Исследование влияния AI на человеческое сознание и поведение.' },
  { title: 'Телесно-ориентированные практики', desc: 'Интеграция телесного опыта в психотерапевтические подходы. Соматическая психология и биоэнергетический анализ.' },
  { title: 'Психология зависимостей', desc: 'Механизмы формирования привязанностей и зависимостей. Инновационные методы профилактики и терапии.' },
  { title: 'Культурная и этническая психология', desc: 'Влияние культурной, религиозной и этнической среды на формирование психики и поведенческих паттернов.' },
];

export default function Directions() {
  return (
    <div>
      <PageHero label="Направления" title="Направления исследований" description="Восемь ключевых направлений научной работы РУСАЛЕН" />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {directions.map((d, i) => (
              <GlassCard key={i} delay={i * 0.08} className="border-l-2 border-l-primary/30">
                <div className="flex items-start gap-4">
                  <span className="text-gold-gradient font-display text-2xl font-bold shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-semibold mb-2">{d.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}