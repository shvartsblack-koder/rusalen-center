import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ label, title, description, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {label && (
        <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{title}</h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl leading-relaxed mx-auto text-base sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}