import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import GlassCard from '../shared/GlassCard';
import { Home, GraduationCap, Briefcase } from 'lucide-react';

const pillars = [
  {
    num: '01',
    tag: 'LIVE',
    title: 'Жить',
    icon: Home,
    desc: 'Среда для повседневной жизни: ферма, площадь, библиотека, тишина леса, wellness и место для случайных встреч.',
  },
  {
    num: '02',
    tag: 'STUDY',
    title: 'Учиться',
    icon: GraduationCap,
    desc: 'Академия, PSYTY Lab, библиотека и лаборатория снов — непрерывное образование и исследования рядом с домом.',
  },
  {
    num: '03',
    tag: 'WORK',
    title: 'Работать',
    icon: Briefcase,
    desc: 'Practice House, исследовательские и профессиональные пространства — практика и карьера без поездок.',
  },
];

export default function PillarsSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Три опоры одной среды"
          title="Жить, учиться и работать — в одном месте"
          description="PSYTY объединяет три обычно разделённые сферы жизни в одну среду. Это и есть главная ценность — не квадратные метры, а возможности каждый день."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <GlassCard key={p.num} delay={i * 0.1}>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] text-muted-foreground">{p.num}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{p.tag}</span>
              </div>
              <p.icon className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-display text-xl font-bold mb-3">{p.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </GlassCard>
          ))}
        </div>
        <p className="font-display text-xl sm:text-2xl font-bold text-center mt-12">
          Вы выбираете не квадратные метры. <span className="text-gold-gradient">Вы выбираете свою среду.</span>
        </p>
      </div>
    </section>
  );
}