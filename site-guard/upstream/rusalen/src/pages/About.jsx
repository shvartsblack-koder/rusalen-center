import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/shared/PageHero';
import SectionHeader from '../components/shared/SectionHeader';
import GlassCard from '../components/shared/GlassCard';
import { Monitor, Home, Layers, Wifi, Radio, BookOpen, BarChart3, FileText } from 'lucide-react';

const CAMPUS_IMG = 'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/0b0e8e0c0_generated_b016e060.png';

const todayCards = [
  { icon: Monitor, title: 'Массовые тренинговые мероприятия', desc: 'Интенсивы, школы, семинары и обучающие программы' },
  { icon: Home, title: 'Комфортные зоны проживания', desc: 'Группового и индивидуального формата' },
  { icon: Layers, title: 'Помещения-трансформеры', desc: 'Для разных форматов работы и обучения' },
  { icon: Wifi, title: 'Техническая инфраструктура', desc: 'Интеграция с соцсетями и обучающими платформами' },
  { icon: Radio, title: 'PsyMedia', desc: 'Информационный канал центра' },
  { icon: BookOpen, title: 'PsyPedia', desc: 'Библиотека знаний по психологии' },
  { icon: BarChart3, title: 'Центр аналитики', desc: 'Сбор и анализ статистических данных' },
  { icon: FileText, title: 'Протоколы', desc: 'Разработка протоколов работы с психосоматикой' },
];

export default function About() {
  return (
    <div>
      <PageHero
        label="Кто мы"
        title="РУСАЛЕН"
        description="Международный центр интегративной психологии, психосоматики и исследований сознания"
        imageUrl={CAMPUS_IMG}
      />

      {/* Yesterday */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block">Наше вчера</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">Наследие и вдохновение</h2>
              <p className="text-muted-foreground leading-relaxed">
                РУСАЛЕН — это многократно улучшенный, модернизированный и адаптированный к беспрерывно меняющемуся контенту 
                и актуальной психологической повестке аналог легендарного Калифорнийского Института Эсален, созданный по-русски, 
                с масштабом, усилиями международной команды предпринимателей-визионеров, архитекторов, проектировщиков, 
                строителей, психологов, социологов и учёных.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl overflow-hidden aspect-video"
            >
              <img src={CAMPUS_IMG} alt="Кампус РУСАЛЕН" className="w-full h-full object-cover opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Today */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Наше сегодня"
            title="Территория эксперимента"
            description="РУСАЛЕН — это территория свободного, коммуникативного, телесно-ориентированного, приборного и исследовательского эксперимента, направленного на углубление понимания человеческой психики, её картографии и связей с нейрофизиологией, биохимией, генетикой, а также этнической, культурной и религиозной средой."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {todayCards.map((card, i) => (
              <GlassCard key={i} delay={i * 0.08}>
                <card.icon className="w-6 h-6 text-accent mb-3" />
                <h4 className="font-semibold text-sm mb-1">{card.title}</h4>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Tomorrow */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4 block">Наше завтра</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">Лаборатория будущего</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                РУСАЛЕН — это исследовательская лаборатория по анализу новых аспектов эволюционирующей психики 
                современного человека: цифрового аутизма, эготизма, привязанностей, зависимостей, адаптации 
                классических психологических школ к дополненной и виртуальной реальности, а также изучения 
                искусственного интеллекта и возможности формирования кибернетической психологии Artificial Ego.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <GlassCard className="border-l-2 border-l-primary">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary block mb-3">Наши ресурсы</span>
              <h3 className="font-display text-2xl font-semibold mb-4">Эндаумент-фонд</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                РУСАЛЕН — это эндаумент-фонд, обеспечивающий финансирование проекта, исследований и научных программ 
                за счёт грантов, институциональных и квалифицированных инвесторов. Также это краудфандинговая площадка 
                для финансирования отдельных исследований со стороны частных лиц.
              </p>
            </GlassCard>
            <GlassCard className="border-l-2 border-l-accent">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent block mb-3">Наша миссия</span>
              <h3 className="font-display text-2xl font-semibold mb-4">Новая психология XXI века</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                РУСАЛЕН — краеугольный камень на пути исследования, выработки и продвижения правил новой психологии 
                XXI века, психологического здоровья и осознанности граждан многонационального, многоконфессионального 
                и информационно-открытого государства.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Final phrase */}
      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-gradient font-display text-2xl sm:text-3xl lg:text-4xl font-bold italic"
          >
            РУСАЛЕН — новое место твоего супер-эго. И тени.
          </motion.p>
        </div>
      </section>
    </div>
  );
}