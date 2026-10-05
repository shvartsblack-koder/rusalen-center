import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../../components/shared/PageHero';
import SectionHeader from '../../components/shared/SectionHeader';
import GlassCard from '../../components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Users, Target, BarChart2, ShieldCheck, Megaphone, ArrowLeft } from 'lucide-react';

const projectTypes = [
  { icon: Target, label: 'Исследовательские проекты', desc: 'Финансирование научных исследований в области психологии и нейронаук' },
  { icon: Users, label: 'Образовательные инициативы', desc: 'Разработка курсов, учебных материалов и образовательных программ' },
  { icon: BarChart2, label: 'Технологические решения', desc: 'Создание цифровых инструментов, приложений и платформ для психологов' },
  { icon: Megaphone, label: 'Социальные проекты', desc: 'Программы психологической помощи уязвимым группам населения' },
];

const howItWorks = [
  { num: '01', title: 'Создайте кампанию', desc: 'Опишите проект, задайте цель финансирования и сроки сбора' },
  { num: '02', title: 'Привлекайте сторонников', desc: 'Делитесь кампанией в сообществе РУСАЛЕН и соцсетях' },
  { num: '03', title: 'Получите поддержку', desc: 'Принимайте взносы от частных лиц, организаций и фондов' },
  { num: '04', title: 'Реализуйте проект', desc: 'Отчитывайтесь перед сторонниками и реализуйте задуманное' },
];

export default function Crowdfunding() {
  return (
    <div>
      <PageHero
        label="PsyTech · Краудфандинг"
        title="Краудфандинговая платформа Русален"
        description="Площадка для привлечения коллективного финансирования психологических, образовательных и исследовательских инициатив"
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
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4 block">О платформе</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">Финансирование идей, которые меняют психологию</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Краудфандинговая платформа РУСАЛЕН объединяет авторов проектов с сообществом неравнодушных людей, готовых поддержать развитие психологической науки и практики.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Платформа открыта для исследователей, преподавателей, психологов-практиков и команд, работающих над созданием новых решений для ментального здоровья.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projectTypes.map((p, i) => (
                <GlassCard key={i} delay={i * 0.1}>
                  <p.icon className="w-6 h-6 text-accent mb-3" />
                  <h4 className="font-semibold text-sm mb-1">{p.label}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{p.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader label="Как это работает" title="Запустите кампанию за 4 шага" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((s, i) => (
              <GlassCard key={i} delay={i * 0.1} className="text-center">
                <span className="text-gold-gradient font-display text-4xl font-bold block mb-3">{s.num}</span>
                <h4 className="font-semibold mb-2">{s.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { value: '50+', label: 'Поддержанных проектов' },
              { value: '10 000+', label: 'Участников сообщества' },
              { value: '₽80 млн', label: 'Собранного финансирования' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-gold-gradient font-display text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <Users className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold mb-4">Запустите свою кампанию</h2>
          <p className="text-muted-foreground mb-8">Расскажите нам о своём проекте, и мы поможем привлечь финансирование от сообщества РУСАЛЕН.</p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80 px-8">
            <Link to="/contacts">Предложить проект</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}