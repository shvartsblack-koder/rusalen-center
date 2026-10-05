import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Send, Handshake, UserPlus } from 'lucide-react';
import PageHero from '../components/shared/PageHero';
import SectionHeader from '../components/shared/SectionHeader';
import GlassCard from '../components/shared/GlassCard';

const directions = [
  { title: 'Интегративная психология', desc: 'Синтез подходов и школ для комплексного понимания психики' },
  { title: 'Психосоматика', desc: 'Связь психических процессов с телесным здоровьем' },
  { title: 'Исследования сознания', desc: 'Картография и моделирование состояний сознания' },
  { title: 'Цифровая психология', desc: 'Психика в цифровой среде, Homo Digital, цифровой аутизм' },
  { title: 'ИИ и психика', desc: 'Artificial Ego: кибернетическая психология и ИИ' },
  { title: 'Телесно-ориентированные практики', desc: 'Интеграция телесного опыта в психотерапевтические подходы' },
  { title: 'Психология зависимостей', desc: 'Механизмы привязанностей, зависимостей и их терапия' },
  { title: 'Культурная и этническая психология', desc: 'Влияние культурной и религиозной среды на психику' },
];

const subpages = [
  { label: 'Направления исследований', path: '/science/directions' },
  { label: 'Лаборатории и исследовательские группы', path: '/science/labs' },
  { label: 'Программная деятельность', path: '/science/programs' },
  { label: 'Публикации', path: '/science/publications' },
  { label: 'Конференции', path: '/science/conferences' },
  { label: 'Международная деятельность', path: '/science/international' },
  { label: 'Договоры сотрудничества', path: '/science/partnerships' },
];

export default function Science() {
  return (
    <div>
      <PageHero
        label="Научная деятельность"
        title="Исследования и открытия"
        description="Фундаментальные и прикладные исследования в области психологии, психосоматики, нейронауки и цифрового сознания"
      />

      {/* Subpages navigation */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {subpages.map((sp) => (
              <Link
                key={sp.path}
                to={sp.path}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground glass rounded-lg transition-colors"
              >
                {sp.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Направления"
            title="Направления исследований"
            description="Восемь ключевых направлений, формирующих научную повестку РУСАЛЕН"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {directions.map((d, i) => (
              <GlassCard key={i} delay={i * 0.08}>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-mono text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="font-semibold text-sm mb-2">{d.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="text-center">
              <Send className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Предложить исследование</h4>
              <p className="text-xs text-muted-foreground mb-4">Подайте заявку на собственный исследовательский проект</p>
              <Button asChild variant="outline" size="sm" className="border-border/50">
                <Link to="/contacts">Подать заявку</Link>
              </Button>
            </GlassCard>
            <GlassCard className="text-center" delay={0.1}>
              <Handshake className="w-8 h-8 text-accent mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Стать научным партнёром</h4>
              <p className="text-xs text-muted-foreground mb-4">Присоединитесь к международной исследовательской сети</p>
              <Button asChild variant="outline" size="sm" className="border-border/50">
                <Link to="/contacts">Связаться</Link>
              </Button>
            </GlassCard>
            <GlassCard className="text-center" delay={0.2}>
              <UserPlus className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Подать заявку на участие</h4>
              <p className="text-xs text-muted-foreground mb-4">Станьте участником исследовательской программы</p>
              <Button asChild variant="outline" size="sm" className="border-border/50">
                <Link to="/contacts">Подать заявку</Link>
              </Button>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}