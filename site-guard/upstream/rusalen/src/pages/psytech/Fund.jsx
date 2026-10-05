import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../../components/shared/PageHero';
import SectionHeader from '../../components/shared/SectionHeader';
import GlassCard from '../../components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Building, DollarSign, TrendingUp, ShieldCheck, Handshake, ArrowLeft, Globe } from 'lucide-react';

const fundTypes = [
  { icon: DollarSign, label: 'Грантовое финансирование', desc: 'Безвозмездная поддержка фундаментальных и прикладных исследований' },
  { icon: TrendingUp, label: 'Венчурные инвестиции', desc: 'Вхождение в капитал перспективных стартапов на ранних стадиях' },
  { icon: Handshake, label: 'Партнёрские программы', desc: 'Со-финансирование совместных проектов с университетами и корпорациями' },
  { icon: Globe, label: 'Международные гранты', desc: 'Поддержка проектов с международным участием и выходом на глобальный рынок' },
];

const criteria = [
  'Инновационность и научная обоснованность',
  'Практическая применимость в области психологии',
  'Команда с подтверждённой экспертизой',
  'Чёткие измеримые результаты и KPI',
  'Масштабируемость и устойчивость модели',
  'Соответствие миссии экосистемы РУСАЛЕН',
];

export default function Fund() {
  return (
    <div>
      <PageHero
        label="PsyTech · Фонд"
        title="Фонд Русален"
        description="Инвестиционный фонд, поддерживающий перспективные проекты на стыке психологии, нейронауки и технологий"
      />

      <section className="py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link to="/psytech" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Назад к PsyTech
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block">О фонде</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">Инвестиции в науку о человеке</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Фонд РУСАЛЕН аккумулирует и распределяет ресурсы для поддержки проектов, которые развивают психологическую науку и создают новые инструменты помощи людям.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Мы финансируем как академические исследования, так и коммерческие продукты, руководствуясь принципом максимального общественного блага от каждой инвестиции.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fundTypes.map((f, i) => (
                <GlassCard key={i} delay={i * 0.1}>
                  <f.icon className="w-6 h-6 text-primary mb-3" />
                  <h4 className="font-semibold text-sm mb-1">{f.label}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{f.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { value: '₽200 млн', label: 'Объём фонда' },
              { value: '30+', label: 'Поддержанных проектов' },
              { value: '15', label: 'Стран присутствия' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-gold-gradient font-display text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader label="Критерии отбора" title="Что мы ищем в проектах" />
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            {criteria.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 glass rounded-lg px-4 py-3"
              >
                <ShieldCheck className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-sm">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <Building className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold mb-4">Претендуйте на финансирование</h2>
          <p className="text-muted-foreground mb-8">Расскажите о вашем проекте — мы рассмотрим заявку и свяжемся с вами для детального обсуждения.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80 px-8">
              <Link to="/contacts">Подать заявку на грант</Link>
            </Button>
            <Button asChild variant="outline" className="border-border/50 px-8">
              <Link to="/contacts">Стать инвестором фонда</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}