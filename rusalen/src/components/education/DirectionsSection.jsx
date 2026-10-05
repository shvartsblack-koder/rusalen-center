import React from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import GlassCard from '@/components/shared/GlassCard';
import { directions } from './educationModel';

export default function DirectionsSection() {
  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Направления подготовки"
          title="Из чего складывается система"
          description="Пять направлений связаны общей логикой: от клинической грамотности — к методам, специализациям и работе в клинической среде."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {directions.map((d, i) => (
            <GlassCard key={d.id} delay={(i % 3) * 0.08}>
              <span className="block w-8 h-px bg-gradient-to-r from-primary to-accent mb-4" />
              <h4 className="font-semibold mb-2">{d.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{d.text}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}