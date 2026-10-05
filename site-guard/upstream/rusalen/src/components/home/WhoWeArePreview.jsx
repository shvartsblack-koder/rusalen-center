import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import GlassCard from '../shared/GlassCard';

const horizons = [
  {
    label: 'Наше вчера',
    text: 'Модернизированный аналог легендарного Калифорнийского Института Эсален, созданный усилиями международной команды визионеров, психологов, социологов и учёных.',
    accent: 'border-l-primary',
  },
  {
    label: 'Наше сегодня',
    text: 'Территория свободного исследовательского эксперимента, направленного на углубление понимания человеческой психики, её картографии и связей с нейрофизиологией.',
    accent: 'border-l-accent',
  },
  {
    label: 'Наше завтра',
    text: 'Исследовательская лаборатория по анализу новых аспектов эволюционирующей психики: цифрового аутизма, адаптации к VR/AR и формирования кибернетической психологии Artificial Ego.',
    accent: 'border-l-[hsl(260,40%,50%)]',
  },
];

export default function WhoWeArePreview() {
  return (
    <section className="py-14 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="О центре"
          title="Три горизонта РУСАЛЕН"
          description="От наследия классической психологии — к исследованиям цифрового сознания будущего"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {horizons.map((h, i) => (
            <GlassCard key={i} delay={i * 0.15} className={`border-l-2 ${h.accent}`}>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{h.label}</span>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3">{h.text}</p>
            </GlassCard>
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" className="border-border/50 hover:bg-secondary gap-2">
            <Link to="/about"><ArrowRight className="w-4 h-4" /> Подробнее о нас</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}