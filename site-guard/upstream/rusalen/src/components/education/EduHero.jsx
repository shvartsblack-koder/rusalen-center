import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { BRAND_MOTTO } from './educationModel';

export default function EduHero() {
  return (
    <section className="relative pt-36 pb-14 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4"
        >
          Дополнительное профессиональное образование
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
        >
          ДПО <span className="text-gold-gradient">РУСАЛЕН</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-xl sm:text-2xl mb-4 max-w-2xl"
        >
          Учимся видеть случай целиком и понимать, что делать дальше
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground max-w-2xl leading-relaxed mb-8"
        >
          Клиническая грамотность, психотерапевтические методы, психофизиология и профильные
          специализации — в связанной системе профессиональной подготовки психолога.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80">
            <Link to="/education/programs">
              Выбрать программу <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary/40 hover:bg-primary/10">
            <a href="#how-we-teach">Как устроено обучение</a>
          </Button>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70"
        >
          {BRAND_MOTTO}
        </motion.p>
      </div>
    </section>
  );
}