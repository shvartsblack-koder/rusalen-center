import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/shared/PageHero';
import SectionHeader from '../components/shared/SectionHeader';
import GlassCard from '../components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Rocket, Users, Lightbulb, TrendingUp, Building, DollarSign, Send, Handshake, MessageSquare, ArrowRight } from 'lucide-react';

const PSYTECH_IMG = 'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/6d906a8e9_generated_352a4588.png';

const sections = [
  {
    icon: Rocket,
    title: 'Акселератор Русален',
    desc: 'Поддержка стартапов и цифровых продуктов в сфере психологии и AI. Менторство, финансирование и сопровождение выхода на рынок.',
    link: '/psytech/accelerator',
  },
  {
    icon: Users,
    title: 'Краудфандинговая платформа Русален',
    desc: 'Площадка для привлечения коллективного финансирования исследовательских, образовательных и технологических инициатив.',
    link: '/psytech/crowdfunding',
  },
  {
    icon: Building,
    title: 'Фонд Русален',
    desc: 'Инвестиционный фонд для перспективных проектов на стыке психологии и технологий. Грантовое и венчурное финансирование.',
    link: '/psytech/fund',
  },
];

export default function PsyTech() {
  return (
    <div>
      <PageHero
        label="PsyTech"
        title="Технологии будущего психологии"
        description="Технологическое направление РУСАЛЕН, объединяющее стартапы, цифровые продукты, исследовательские инициативы и инвестиционные механизмы"
        imageUrl={PSYTECH_IMG}
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((s, i) => (
              <Link key={i} to={s.link} className="block group">
                <GlassCard delay={i * 0.15} className="text-center h-full hover:border-accent/30 transition-colors">
                  <s.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-accent font-mono uppercase tracking-widest group-hover:gap-2 transition-all">
                    Подробнее <ArrowRight className="w-3 h-3" />
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader label="Присоединиться" title="Начните с нами" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="text-center">
              <Send className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Подать проект</h4>
              <p className="text-xs text-muted-foreground mb-4">Представьте ваш проект экспертам акселератора</p>
              <Button asChild variant="outline" size="sm" className="border-border/50">
                <Link to="/contacts">Подать заявку</Link>
              </Button>
            </GlassCard>
            <GlassCard className="text-center" delay={0.1}>
              <TrendingUp className="w-8 h-8 text-accent mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Стать инвестором</h4>
              <p className="text-xs text-muted-foreground mb-4">Инвестируйте в будущее психологических технологий</p>
              <Button asChild variant="outline" size="sm" className="border-border/50">
                <Link to="/contacts">Связаться</Link>
              </Button>
            </GlassCard>
            <GlassCard className="text-center" delay={0.2}>
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Получить консультацию</h4>
              <p className="text-xs text-muted-foreground mb-4">Обсудите возможности сотрудничества с нашей командой</p>
              <Button asChild variant="outline" size="sm" className="border-border/50">
                <Link to="/contacts">Написать</Link>
              </Button>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}