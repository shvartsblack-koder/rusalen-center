import React from 'react';
import PageHero from '../../components/shared/PageHero';
import GlassCard from '../../components/shared/GlassCard';
import { Globe, Handshake, GraduationCap, FlaskConical } from 'lucide-react';

const activities = [
  { icon: Globe, title: 'Международные партнёрства', desc: 'Сотрудничество с ведущими университетами и исследовательскими центрами мира' },
  { icon: Handshake, title: 'Совместные исследования', desc: 'Междисциплинарные исследовательские проекты с международными командами' },
  { icon: GraduationCap, title: 'Академический обмен', desc: 'Программы обмена для студентов, преподавателей и исследователей' },
  { icon: FlaskConical, title: 'Международные конференции', desc: 'Организация и участие в международных научных мероприятиях' },
];

export default function International() {
  return (
    <div>
      <PageHero label="Международная деятельность" title="Международная деятельность" description="Глобальное присутствие и международное сотрудничество РУСАЛЕН" />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activities.map((a, i) => (
              <GlassCard key={i} delay={i * 0.1} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <a.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}