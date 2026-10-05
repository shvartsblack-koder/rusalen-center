import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import GlassCard from '../shared/GlassCard';
import { Microscope, HeartPulse, Lightbulb } from 'lucide-react';

const groups = [
  {
    num: '01',
    tag: 'RESEARCHERS',
    title: 'Исследователи',
    icon: Microscope,
    desc: 'Нейроучёные, академики и аналитики, для которых PSYTY Lab и библиотека — продолжение дома. Они превращают повседневность в поле изучения человеческой природы.',
  },
  {
    num: '02',
    tag: 'THERAPISTS',
    title: 'Терапевты',
    icon: HeartPulse,
    desc: 'Психотерапевты, семейные и организационные психологи, психиатры. Practice House и пространства диалога — их профессиональная среда и точка роста.',
  },
  {
    num: '03',
    tag: 'ENTREPRENEURS',
    title: 'Предприниматели',
    icon: Lightbulb,
    desc: 'Создатели проектов и инициатив, которые превращают идеи в практику. Они дают сообществу ритм, возможности и живую связь с внешним миром.',
  },
];

export default function CommunitySection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Принципы сообщества"
          title="Единство исследователей, терапевтов и предпринимателей"
          description="PSYTY строится на пересечении трёх профессиональных миров. Вместе они создают среду, где развитие — не отдельное усилие, а естественная часть каждого дня: личного, профессионального и человеческого."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((g, i) => (
            <GlassCard key={g.num} delay={i * 0.1}>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] text-muted-foreground">{g.num}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{g.tag}</span>
              </div>
              <g.icon className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-display text-xl font-bold mb-3">{g.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
            </GlassCard>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-10">
          Среда, где каждый день наполняется смыслом — развития личностного и профессионального.
        </p>
      </div>
    </section>
  );
}