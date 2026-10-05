import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { mailtoHref } from '@/lib/mailto';
import { psychiatryFamily, BRAND_MOTTO } from '@/components/education/educationModel';

export default function PsychiatryHero() {
  const family = psychiatryFamily();
  const total = family.reduce((s, p) => s + (p.hours?.total || 0), 0);
  const stages = family
    .map((p) => `${p.stageTitle.toLowerCase()} (${p.hours?.total || '?'} ч)`)
    .join(' и ');

  return (
    <section className="relative pt-36 pb-14 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4"
        >
          Программа повышения квалификации
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
        >
          Психиатрия <span className="text-gold-gradient">для психологов</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-xl sm:text-2xl mb-6 max-w-3xl"
        >
          Не поставить диагноз. Не пропустить главное. Понять, что делать дальше.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground max-w-2xl leading-relaxed mb-8"
        >
          Полный маршрут — две самостоятельные последовательные программы: {stages}. Всего{' '}
          {total || '—'} часов: от наблюдения и навигации к сложной дифференциальной формулировке
          и тактике.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80">
            <a href={mailtoHref('ДПО РУСАЛЕН — Психиатрия для психологов — условия обучения')}>
              Запросить условия
            </a>
          </Button>
          <Button asChild variant="outline" className="border-primary/40 hover:bg-primary/10">
            <a href="#stages">Структура маршрута</a>
          </Button>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70"
        >
          {BRAND_MOTTO}
        </motion.p>
      </div>
    </section>
  );
}