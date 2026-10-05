import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../../components/shared/PageHero';
import GlassCard from '../../components/shared/GlassCard';
import { Target, Eye, Compass, Flame } from 'lucide-react';

const goals = [
  { icon: Target, title: 'Исследования', desc: 'Проведение фундаментальных и прикладных исследований в области психологии, психосоматики и нейронауки' },
  { icon: Eye, title: 'Образование', desc: 'Подготовка нового поколения специалистов, владеющих как классическими, так и инновационными методами' },
  { icon: Compass, title: 'Интеграция', desc: 'Объединение международного сообщества психологов, исследователей и практиков на единой платформе' },
  { icon: Flame, title: 'Инновации', desc: 'Разработка цифровых инструментов и технологий для психологии будущего, включая AI и VR/AR' },
];

export default function Mission() {
  return (
    <div>
      <PageHero label="Миссия" title="Миссия и цели" description="Исследование, выработка и продвижение правил новой психологии XXI века" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground leading-relaxed text-center"
            >
              РУСАЛЕН — краеугольный камень на пути исследования, выработки и продвижения правил 
              новой психологии XXI века, психологического здоровья и осознанности граждан многонационального, 
              многоконфессионального и информационно-открытого государства.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {goals.map((g, i) => (
              <GlassCard key={i} delay={i * 0.1} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <g.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-gradient font-display text-2xl sm:text-3xl font-bold italic"
          >
            РУСАЛЕН — новое место твоей самости.
          </motion.p>
        </div>
      </section>
    </div>
  );
}