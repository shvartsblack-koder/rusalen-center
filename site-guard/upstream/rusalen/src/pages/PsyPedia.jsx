import React, { useState } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionHeader from '../components/shared/SectionHeader';
import GlassCard from '../components/shared/GlassCard';
import FreudAssistant from '../components/psypedia/FreudAssistant';
import { BookOpen, FileText, Headphones, Video, Brain } from 'lucide-react';

const sections = [
  { icon: BookOpen, title: 'Литература', desc: 'Классические и современные работы по психологии и психосоматике' },
  { icon: FileText, title: 'Статьи и публикации', desc: 'Научные статьи, исследования и аналитические материалы' },
  { icon: Headphones, title: 'Аудиоматериалы', desc: 'Лекции, подкасты и аудиоверсии ключевых работ' },
  { icon: Video, title: 'Видео', desc: 'Видеолекции, документальные фильмы и образовательные ролики' },
];

export default function PsyPedia() {
  return (
    <div>
      <PageHero
        label="PsyPedia"
        title="Библиотека знаний"
        description="Открытая библиотека знаний по психологии, психосоматике, исследованиям сознания и цифровой трансформации человека"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((s, i) => (
              <GlassCard key={i} delay={i * 0.1} className="text-center">
                <s.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Freud AI */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Нейронный ассистент"
            title="Что бы сказал Фрейд?"
            description="Задайте вопрос нейронному ассистенту, вдохновлённому классиками психологии"
          />
          <FreudAssistant />
        </div>
      </section>
    </div>
  );
}