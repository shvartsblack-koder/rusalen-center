import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Heart, MapPin, Phone, Users, Star, ChevronRight, ArrowRight, CheckCircle, Brain, Activity, Lock, Globe, ChevronLeft, Menu, X } from 'lucide-react';

const slides = [
  {
    image: 'https://media.base44.com/images/public/6a2ad240524cbc0ab3fedc84/98c654a97_generated_image.png',
    label: 'Эмоциональный анализ',
    status: 'green',
    metrics: ['Тревога: 12%', 'Стресс: 8%', 'Усталость: 24%'],
  },
  {
    image: 'https://media.base44.com/images/public/6a2ad240524cbc0ab3fedc84/c1dbf2fa4_generated_image.png',
    label: 'Эмоциональный анализ',
    status: 'green',
    metrics: ['Тревога: 14%', 'Стресс: 10%', 'Усталость: 22%'],
  },
  {
    image: 'https://media.base44.com/images/public/6a2ad240524cbc0ab3fedc84/2fbcf67da_generated_image.png',
    label: 'Биометрический мониторинг',
    status: 'yellow',
    metrics: ['ЧСС: 78 уд/мин', 'HRV: 42 мс', 'SpO₂: 98%'],
  },
  {
    image: 'https://media.base44.com/images/public/6a2ad240524cbc0ab3fedc84/b73ded861_generated_image.png',
    label: 'Биометрический мониторинг',
    status: 'yellow',
    metrics: ['ЧСС: 82 уд/мин', 'HRV: 38 мс', 'SpO₂: 97%'],
  },
  {
    image: 'https://media.base44.com/images/public/6a2ad240524cbc0ab3fedc84/3d98d69dd_generated_image.png',
    label: 'Кризисный скрининг',
    status: 'green',
    metrics: ['Риск: Низкий', 'Настроение: 7/10', 'Сон: 6.5 ч'],
  },
];

const statusColor = { green: '#34d399', yellow: '#fbbf24', orange: '#f97316', red: '#f87171' };

function FaceScanSlider() {
  const [current, setCurrent] = useState(0);
  const [scanY, setScanY] = useState(0);
  const animRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    let raf;
    let dir = 1;
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % 3000;
      const pct = elapsed / 3000;
      if (pct < 0.5) setScanY(pct * 2 * 100);
      else setScanY((1 - (pct - 0.5) * 2) * 100);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full max-w-xs mx-auto select-none">
      {/* Main card */}
      <div className="relative rounded-2xl overflow-hidden border border-emerald-400/30 shadow-2xl shadow-emerald-900/40" style={{ aspectRatio: '3/4' }}>
        {/* Face image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slide.image}
            alt="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-0.5 z-20 pointer-events-none"
          style={{ top: `${scanY}%`, background: 'linear-gradient(90deg, transparent, #34d399, #6ee7b7, #34d399, transparent)', boxShadow: '0 0 12px 3px rgba(52,211,153,0.5)' }}
        />

        {/* Corner brackets */}
        {[['top-3 left-3', 'border-t-2 border-l-2'], ['top-3 right-3', 'border-t-2 border-r-2'], ['bottom-3 left-3', 'border-b-2 border-l-2'], ['bottom-3 right-3', 'border-b-2 border-r-2']].map(([pos, brd], i) => (
          <div key={i} className={`absolute ${pos} w-5 h-5 border-emerald-400 ${brd} z-20`} />
        ))}

        {/* Facial grid dots */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-40" viewBox="0 0 300 400">
          {[
            [150,120],[120,140],[180,140],[110,175],[190,175],[150,200],[130,230],[170,230],[150,260],
            [125,155],[175,155],[150,170]
          ].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#34d399" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5 + i*0.1}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {[[120,140],[150,120],[180,140],[120,140],[110,175],[180,140],[190,175],[110,175],[130,230],[190,175],[170,230]].map(([x,y],i,arr) => i % 2 === 0 && arr[i+1] ? (
            <line key={`l${i}`} x1={x} y1={y} x2={arr[i+1][0]} y2={arr[i+1][1]} stroke="#34d399" strokeWidth="0.8" opacity="0.3" />
          ) : null)}
        </svg>

        {/* Status badge */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: statusColor[slide.status] }} />
          <span className="text-xs text-white font-medium">ИИ активен</span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-xs text-emerald-300 font-semibold mb-2 uppercase tracking-wider">{slide.label}</div>
              <div className="flex flex-wrap gap-1.5">
                {slide.metrics.map((m, i) => (
                  <span key={i} className="text-xs bg-black/50 backdrop-blur-sm border border-white/10 text-white/80 px-2 py-0.5 rounded-full">{m}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-emerald-400 w-5' : 'bg-white/30'}`} />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors z-40">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button onClick={() => setCurrent(c => (c + 1) % slides.length)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors z-40">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

const stats = [
  { value: '12 847', label: 'Пользователей', icon: Users },
  { value: '386', label: 'Специалистов', icon: Heart },
  { value: '2 193', label: 'Кризисных обращений', icon: Shield },
  { value: '147', label: 'Центров помощи', icon: MapPin },
];

const features = [
  { icon: Brain, title: 'ИИ-мониторинг', desc: 'Интеллектуальный анализ эмоционального и психофизиологического состояния в реальном времени через ИИ-Антикризис' },
  { icon: Shield, title: 'Кризисное реагирование', desc: 'Тревожная кнопка — моментальный запрос на оказание помощи и экстренное оповещение специалистов и доверенных контактов в кризисном состоянии' },
  { icon: Heart, title: 'Психологи-волонтеры', desc: 'Обширная федеральная сеть добровольцев, психологов, психиатров и кризисных консультантов, готовых оказать первую помощь на месте' },
  { icon: MapPin, title: 'Карта помощи', desc: 'Интерактивная карта центров помощи, специалистов и реабилитационных учреждений, а также форма оперативного обращения за помощью' },
  { icon: Activity, title: 'Носимые устройства', desc: 'Дополнительная интеграция с умными часами, браслетами и кольцами для мониторинга физиологических показателей' },
  { icon: Lock, title: 'Помоги себе сам', desc: 'Интегрированные звуковые и визуальные программы и алгоритмы оперативного снятия тревожных состояний и обострений' },
];

const partners = ['АНО МИЦ Русален', 'Ветеранские организации РФ', 'Российское психологическое общество', 'Цифровое министерство'];

const emergencyContacts = [
  { name: 'Единый номер экстренных служб', number: '112', color: 'bg-red-500/10 text-red-600 border-red-200' },
  { name: 'Телефон доверия (бесплатно)', number: '8-800-2000-122', color: 'bg-amber-500/10 text-amber-700 border-amber-200' },
  { name: 'Психологическая помощь', number: '8-800-2000-200', color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
  { name: 'Горячая линия Минздрава', number: '8-800-200-0-200', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
];

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Spacer to align nav links with hero content */}
          <div className="hidden md:block shrink-0 mr-16 w-8" />

          {/* Desktop nav links */}
          <div className={`hidden md:flex items-center gap-6 text-sm font-medium flex-1 ${scrolled ? 'text-foreground' : 'text-white/80'}`}>
            <a href="#features" className="hover:opacity-70 transition-opacity">О платформе</a>
            <a href="#map" className="hover:opacity-70 transition-opacity">Карта помощи</a>
            <a href="#specialists" className="hover:opacity-70 transition-opacity">Специалисты</a>
            <a href="#contacts" className="hover:opacity-70 transition-opacity">Контакты</a>
          </div>

          {/* Mobile: кнопки слева */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/login" className={`text-sm font-medium border border-white/80 ${scrolled ? 'text-foreground border-foreground/30' : 'text-white'} hover:opacity-70 transition-opacity px-4 py-1.5 rounded-lg`}>Войти</Link>
            <Link to="/register" className="bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity">Начать</Link>
          </div>

          {/* Desktop: кнопки справа */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <Link to="/login" className={`text-sm font-medium border border-white/80 ${scrolled ? 'text-foreground border-foreground/30' : 'text-white'} hover:opacity-70 transition-opacity px-4 py-1.5 rounded-lg`}>Войти</Link>
            <Link to="/register" className="bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity">Начать</Link>
          </div>

          {/* Mobile: гамбургер справа */}
          <button
            className="md:hidden ml-auto p-2 rounded-lg text-white/80 hover:text-white transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Меню"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className={`md:hidden px-4 pb-4 pt-2 flex flex-col gap-1 ${scrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-[#0b2214]/95 backdrop-blur-md'}`}
            >
              {[
                { href: '#features', label: 'О платформе' },
                { href: '#map', label: 'Карта помощи' },
                { href: '#specialists', label: 'Специалисты' },
                { href: '#contacts', label: 'Контакты' },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors ${scrolled ? 'text-foreground hover:bg-muted' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#050f07] via-[#0b2214] to-[#122e1a]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050f07]/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs text-white/80 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ИИ-мониторинг работает круглосуточно
              </div>
              <div className="flex items-center gap-8 mb-3">
                <div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                    ЖИВИЦА
                  </h1>
                  <p className="text-base sm:text-2xl font-display font-light text-emerald-200 mt-1">
                    «На все случаи жизни»
                  </p>
                </div>
                <img
                  src="https://media.base44.com/images/public/6a2ad240524cbc0ab3fedc84/a8fc8efec_pngegg.png"
                  alt="Живица"
                  className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain flex-shrink-0"
                />
              </div>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-7 max-w-lg">
                Цифровая платформа психологической поддержки, кризисного реагирования и социальной адаптации ветеранов СВО и лиц с ПТСР. Безопасно. Конфиденциально. Круглосуточно.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-blue-900/40 text-sm">
                  Получить помощь <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/register?role=psychologist" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-all text-sm">
                  Стать волонтёром
                </Link>
              </div>

            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex justify-center lg:justify-end px-6">
              <FaceScanSlider />
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 text-center">
                <s.icon className="w-4 h-4 text-blue-300 mx-auto mb-1.5" />
                <div className="text-xl sm:text-2xl font-display font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">Возможности платформы</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">Комплексная система поддержки ветеранов СВО, объединяющая передовые технологии с человеческой заботой</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section id="contacts" className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">Экстренные контакты</h2>
            <p className="text-muted-foreground">Бесплатная помощь доступна круглосуточно (24/7)</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {emergencyContacts.map((c, i) => (
              <motion.a key={i} href={`tel:${c.number.replace(/-/g, '')}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center p-6 rounded-2xl border ${c.color} hover:scale-105 transition-transform text-center`}>
                <Phone className="w-6 h-6 mb-3" />
                <div className="font-bold text-lg mb-1">{c.number}</div>
                <div className="text-xs opacity-80">{c.name}</div>
              </motion.a>
            ))}
          </div>

          {/* Partners */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
            <p className="text-sm text-muted-foreground mb-6">Партнеры платформы</p>
            <div className="flex flex-wrap justify-center gap-4">
              {partners.map((p, i) => (
                <div key={i} className="px-5 py-2.5 rounded-xl bg-card border border-border text-sm text-muted-foreground font-medium">
                  {p}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#050f07] to-[#0f2818]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Shield className="w-10 h-10 text-green-300 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">Вы не одни</h2>
            <p className="text-white/70 text-base mb-7 leading-relaxed">
              Тысячи ветеранов СВО уже получают поддержку через платформу «ЖИВИЦА». Сделайте первый шаг — это бесплатно и конфиденциально.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-white text-[#0d1b3e] font-bold text-lg px-10 py-4 rounded-2xl hover:bg-blue-50 transition-colors shadow-xl">
              Получить помощь сейчас <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#030a05] py-12 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src="https://media.base44.com/images/public/6a2ad240524cbc0ab3fedc84/a034ceb6a_image.png" alt="ЖИВИЦА" className="h-9 w-auto" />
              </div>
              <p className="text-white/50 text-sm leading-relaxed">ИИ-платформа психологической поддержки ветеранов СВО и лиц с ПТСР</p>
            </div>
            <div>
              <h4 className="font-semibold text-white/80 mb-3 text-sm">Платформа</h4>
              <div className="space-y-2 text-sm text-white/50">
                <div><Link to="/dashboard" className="hover:text-white/80 transition-colors">Личный кабинет</Link></div>
                <div><Link to="/help-map" className="hover:text-white/80 transition-colors">Карта помощи</Link></div>
                <div><Link to="/specialists" className="hover:text-white/80 transition-colors">Специалисты</Link></div>
                <div><Link to="/community" className="hover:text-white/80 transition-colors">Сообщество</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white/80 mb-3 text-sm">Безопасность</h4>
              <div className="space-y-1 text-sm text-white/50">
                <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> HIPAA-ready</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> GDPR-совместимость</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Шифрование данных</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Многофакторная аутентификация</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/30 text-xs">
            © 2026 ЖИВИЦА. Все данные защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}