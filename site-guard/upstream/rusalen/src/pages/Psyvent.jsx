import React from 'react';
import PageHero from '@/components/shared/PageHero';
import SectionHeader from '@/components/shared/SectionHeader';
import GlassCard from '@/components/shared/GlassCard';
import EventsCalendar from '@/components/psyvent/EventsCalendar';
import SubscribeForm from '@/components/psyvent/SubscribeForm';
import PrebookingForm from '@/components/psyvent/PrebookingForm';
import { Mic, Presentation, Users, Zap } from 'lucide-react';

const formats = [
  { icon: Mic, title: 'Выступления', desc: 'Лекции и keynote мировых звёзд психологии первой величины' },
  { icon: Presentation, title: 'Семинары', desc: 'Глубокая работа с теорией и методологией вместе с авторами ведущих школ' },
  { icon: Users, title: 'Тренинги', desc: 'Практические тренинги и супервизии от практиков мирового уровня' },
  { icon: Zap, title: 'Интенсивы', desc: 'Многоуровневые образовательные интенсивы с плотным погружением в метод' },
];

export default function Psyvent() {
  return (
    <div>
      <PageHero
        label="Проект"
        title="PSYVENT"
        description="Программа организации выступлений, семинаров, тренингов, интенсивов и иных образовательных мероприятий со стороны мировых звёзд психологии первой величины"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Форматы"
            title="Что мы организуем"
            align="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {formats.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.1}>
                <f.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <EventsCalendar />

      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Подписка"
            title="Будьте в курсе событий"
            description="Подпишитесь на обновления PSYVENT — анонсы, предзаказы и специальные условия"
          />
          <div className="mt-8">
            <SubscribeForm />
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Пред-букинг"
            title="Кого привезти в Россию?"
            description="Порекомендуйте звезду психологии — мы организуем их выступление, семинар или интенсив в вашем городе"
          />
          <div className="mt-8">
            <PrebookingForm />
          </div>
        </div>
      </section>
    </div>
  );
}