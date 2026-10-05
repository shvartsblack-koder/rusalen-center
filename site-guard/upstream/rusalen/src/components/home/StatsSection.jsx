import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '8+', label: 'Направлений исследований' },
  { value: '27', label: 'Валют в PsyPay' },
  { value: '50+', label: 'Образовательных программ' },
  { value: '12', label: 'Стран-партнёров' },
];

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-gold-gradient font-display text-4xl sm:text-5xl font-bold mb-2">{s.value}</div>
              <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}