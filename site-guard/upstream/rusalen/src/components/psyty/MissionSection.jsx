import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Handshake, Mail } from 'lucide-react';

const SUNSET_IMG = 'https://media.base44.com/images/public/6a8e40cf6b6b2dae667b4c8e/116cb6f3b_generated_b565d658.png';

export default function MissionSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Реализатор и миссия"
          title="Проект реализуется АНО «Международный исследовательский центр РУСАЛЕН»"
        />
        <div className="max-w-3xl space-y-4 text-sm text-muted-foreground leading-relaxed mb-16">
          <p>
            Проект не ставит задачи получения прибыли. Вся формирующаяся в процессе реализации проекта
            прибавочная стоимость будет направлена на развитие инфраструктуры и улучшение качества PSYTY.
          </p>
          <p>
            Это означает, что средства остаются внутри сообщества: новые лаборатории, образовательные
            программы, общественные пространства и экосистемные инициативы — всё, что делает среду PSYTY
            живее и устойчивее.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl overflow-hidden relative"
        >
          <img src={SUNSET_IMG} alt="PSYTY на закате" className="w-full h-80 sm:h-96 object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
              The City of Psychology · Город Психологии
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-gold-gradient">PSYTY</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mb-8">
              Есть места, где можно жить. И есть места, что меняют то, как вы живёте.
              Город, построенный вокруг человека.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="gap-2">
                <Link to="/contacts"><CalendarCheck className="w-4 h-4" /> Стать Founding Resident</Link>
              </Button>
              <Button asChild variant="outline" className="border-border/50 gap-2">
                <Link to="/contacts"><Handshake className="w-4 h-4" /> Стать партнёром</Link>
              </Button>
              <Button asChild variant="outline" className="border-border/50 gap-2">
                <Link to="/contacts"><Mail className="w-4 h-4" /> Получить PSYTY Book</Link>
              </Button>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-10">
              Your environment shapes you. Choose it consciously.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}