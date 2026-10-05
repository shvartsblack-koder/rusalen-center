import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, FlaskConical, Handshake } from 'lucide-react';

const ALL_SLIDES = [
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/2f1d133c1_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/b86538349_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/ae0b88834_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/26313c87f_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/500b9c741_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/221db283a_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/bed8440dd_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/0a479223c_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/9e2352927_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/fdac4b00a_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/f879d25a7_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/b804ef6e6_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/785d73cbe_image.png',
  'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/a8683ac61_image.png',
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const SLIDES = useMemo(() => {
    return [...ALL_SLIDES].sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [SLIDES]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background slider */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={SLIDES[current]}
            alt=""
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      {/* Neural overlay lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-10" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <line x1="0" y1="200" x2="600" y2="400" stroke="hsl(40,45%,55%)" strokeWidth="0.5" className="animate-pulse-glow" />
          <line x1="300" y1="0" x2="900" y2="600" stroke="hsl(187,80%,53%)" strokeWidth="0.5" className="animate-pulse-glow" />
          <line x1="600" y1="100" x2="1200" y2="500" stroke="hsl(40,45%,55%)" strokeWidth="0.5" className="animate-pulse-glow" />
          <circle cx="600" cy="400" r="3" fill="hsl(40,45%,55%)" className="animate-pulse-glow" />
          <circle cx="300" cy="250" r="2" fill="hsl(187,80%,53%)" className="animate-pulse-glow" />
          <circle cx="900" cy="350" r="2" fill="hsl(40,45%,55%)" className="animate-pulse-glow" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="mb-6">
            <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-foreground/60 mb-2">
              Международный исследовательский центр
            </span>
            <span className="text-gold-gradient font-display text-5xl sm:text-7xl lg:text-8xl font-bold block mb-2">
              РУСАЛЕН
            </span>
            <span className="font-display text-lg sm:text-2xl lg:text-3xl font-light text-foreground/90 leading-tight block">
              Международный центр интегративной психологии, психосоматики и исследований сознания
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm sm:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10 max-w-2xl"
          >
            Центр, объединяющий классический комплекс знаний о психике человека XIX–XX веков 
            с технологиями XXI века, цифровой средой и новыми формами человеческого сознания Homo Digital.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-2 sm:gap-3"
          >
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80 gap-2 h-10 sm:h-12 px-4 sm:px-6 text-sm">
              <Link to="/about"><ArrowRight className="w-4 h-4" /> Узнать о центре</Link>
            </Button>
            <Button asChild variant="outline" className="border-border/50 hover:bg-secondary gap-2 h-10 sm:h-12 px-4 sm:px-6 text-sm">
              <Link to="/education"><BookOpen className="w-4 h-4" /> Образование</Link>
            </Button>
            <Button asChild variant="outline" className="border-border/50 hover:bg-secondary gap-2 h-10 sm:h-12 px-4 sm:px-6 text-sm">
              <Link to="/science"><FlaskConical className="w-4 h-4" /> Наука</Link>
            </Button>
            <Button asChild variant="outline" className="border-border/50 hover:bg-secondary gap-2 h-10 sm:h-12 px-4 sm:px-6 text-sm">
              <Link to="/contacts"><Handshake className="w-4 h-4" /> Партнёрство</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}