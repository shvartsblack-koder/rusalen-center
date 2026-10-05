import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import { CheckCircle2 } from 'lucide-react';

const stages = [
  { num: '01', title: 'Community', desc: 'Формирование сообщества-основателя.', active: true },
  { num: '02', title: 'Location', desc: 'Выбор и приобретение первой площадки.' },
  { num: '03', title: 'Masterplan', desc: 'Архитектура и планирование.' },
  { num: '04', title: 'Founding Residents', desc: 'Ранние бронирования.' },
  { num: '05', title: 'Construction', desc: 'Инфраструктура + первая жилая фаза.' },
  { num: '06', title: 'Opening', desc: 'Первые резиденты въезжают в PSYTY.' },
];

export default function RoadmapSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Статус проекта"
          title="Дорога к PSYTY"
          description="PSYTY — концептуальный проект. Мы не выдаём его за построенный."
        />
        <div className="flex flex-wrap gap-3 mb-10">
          <span className="glass-light rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            Текущий этап — 01 · Community
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stages.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`glass rounded-xl p-5 border-l-2 ${
                s.active ? 'border-l-primary bg-primary/5' : 'border-l-border'
              }`}
            >
              <span className={`font-mono text-[10px] ${s.active ? 'text-primary' : 'text-muted-foreground'}`}>
                {s.num}
              </span>
              <h4 className="font-display text-lg font-bold mt-1 mb-2">{s.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}