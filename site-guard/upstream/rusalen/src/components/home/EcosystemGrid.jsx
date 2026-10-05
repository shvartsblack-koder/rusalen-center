import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Radio, ShoppingCart, CreditCard, Cpu, Building2 } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const ecosystem = [
  { icon: BookOpen, title: 'PsyPedia', desc: 'Открытая библиотека знаний по психологии и исследованиям сознания', path: '/psypedia', color: 'text-primary' },
  { icon: Radio, title: 'PsyMedia', desc: 'Медиа-платформа для дискуссий, интервью и образовательного контента', path: '/psymedia', color: 'text-accent' },
  { icon: ShoppingCart, title: 'PsyTorg', desc: 'Платформа для закупок, конкурсов, грантов и профессиональных возможностей', path: '/psytorg', color: 'text-primary' },
  { icon: CreditCard, title: 'PsyPay', desc: 'Финансовые сервисы для психологов и онлайн-специалистов', path: '/psypay', color: 'text-accent' },
  { icon: Cpu, title: 'PsyTech', desc: 'Технологическое направление: акселератор, краудфандинг и фонд', path: '/psytech', color: 'text-primary' },
  { icon: Building2, title: 'Psyty', desc: 'Проект будущего кампуса — исследовательский город и среда проживания', path: '/psyty', color: 'text-accent' },
];

export default function EcosystemGrid() {
  return (
    <section className="py-14 sm:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Экосистема"
          title="Платформы РУСАЛЕН"
          description="Интегрированная экосистема для науки, образования, медиа и финансов в сфере психологии"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystem.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={item.path}
                className="glass rounded-xl p-6 block group hover:border-primary/20 transition-all duration-300"
              >
                <item.icon className={`w-8 h-8 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}