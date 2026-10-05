import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';

const choices = ['страну', 'город', 'школу', 'университет', 'карьеру', 'партнёра', 'дом'];

export default function IdeaSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Большая идея"
          title="Почему мы выбираем дом, но не выбираем среду?"
        />
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">Мы тщательно выбираем:</p>
        <div className="flex flex-wrap gap-3 mb-10">
          {choices.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-light rounded-lg px-4 py-2 text-sm flex items-center gap-3"
            >
              <span className="font-mono text-[10px] text-primary">{String(i + 1).padStart(2, '0')}</span>
              {c}
            </motion.span>
          ))}
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
          Но редко осознанно выбираем людей и интеллектуальную среду, которая окружает нас каждый день.
        </p>
        <p className="font-display text-2xl sm:text-3xl font-bold max-w-3xl leading-snug mb-6">
          <span className="text-gold-gradient">PSYTY меняет это.</span> PSYTY позволяет человеку выбрать
          не только свой дом — но и свою среду.
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Your environment shapes your mind. Choose your environment.
        </p>
      </div>
    </section>
  );
}