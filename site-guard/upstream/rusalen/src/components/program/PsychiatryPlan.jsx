import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';
import PlanModuleCard from '@/components/program/PlanModuleCard';
import { psychiatryFamily, PSYCHIATRY_PLANS, PSY_DISCLAIMER } from '@/components/education/educationModel';

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

export default function PsychiatryPlan() {
  const family = psychiatryFamily();
  const [activeId, setActiveId] = useState(family[0]?.id || 'psy1');
  const stage = family.find((s) => s.id === activeId) || family[0];
  const plan = PSYCHIATRY_PLANS[activeId] || PSYCHIATRY_PLANS.psy1;
  if (!stage || !plan) return null;

  const t = plan.totals;

  return (
    <section id="plan" className="py-16 border-t border-border/40 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Учебный план"
          title="Учебно-методический план"
          description="Полное содержание каждой ступени: модули, лекционные темы, распределение часов и формы контроля."
        />

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {family.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`glass rounded-xl px-5 py-3 text-left transition-all duration-300 hover:border-primary/30 ${
                s.id === activeId ? 'border-primary/50 shadow-[0_0_24px_rgba(0,229,160,0.12)]' : ''
              }`}
            >
              <span className={`font-mono text-xs block mb-0.5 ${s.id === activeId ? 'text-primary' : 'text-muted-foreground'}`}>
                Ступень {ROMAN[s.stage - 1]} · {s.hours?.total || '—'} ч
              </span>
              <span className="text-sm font-semibold">{s.stageTitle}</span>
            </button>
          ))}
        </div>

        <motion.div key={activeId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="glass rounded-xl p-6 lg:col-span-2">
              <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-primary/80 mb-3">Назначение программы</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{plan.purpose}</p>
            </div>
            <div className="glass rounded-xl p-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-primary/80 mb-3">Место в траектории</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{plan.place}</p>
            </div>
          </div>

          <div className="glass rounded-xl p-6 mb-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-primary/80 mb-4">
              Планируемые образовательные результаты
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
              {plan.outcomes.map((o) => (
                <li key={o} className="text-xs text-muted-foreground leading-relaxed flex gap-2.5">
                  <span className="text-primary/60 shrink-0">✓</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-xl p-5 mb-8 border-primary/20 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-display text-lg">Итого</span>
            <span className="font-mono text-sm text-gold-gradient font-bold">Всего {t.total} акад. ч.</span>
            <span className="font-mono text-xs text-muted-foreground">Лекции {t.lecture}</span>
            <span className="font-mono text-xs text-muted-foreground">Практика {t.practice}</span>
            <span className="font-mono text-xs text-muted-foreground">Самостоятельная работа {t.self}</span>
            <span className="font-mono text-xs text-muted-foreground ml-auto">{plan.modules.length} модулей</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plan.modules.map((m, i) => (
              <PlanModuleCard key={m.title} module={m} index={i} />
            ))}
          </div>

          <div className="glass rounded-xl p-6 mt-8">
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-primary/80 mb-3">Практика и контроль</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{plan.practice}</p>
            <p className="text-xs text-muted-foreground/70 leading-relaxed border-l-2 border-border pl-4">{PSY_DISCLAIMER}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}