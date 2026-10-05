import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, UserCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/shared/Logo';
import { useLeadModal } from '@/components/LeadModal';

const navItems = [
  { label: 'Кто мы', path: '/about', children: [
    { label: 'Команда', path: '/about/team' },
    { label: 'Миссия и цели', path: '/about/mission' },
    { label: 'Новости', path: '/about/news' },
    { label: 'Вакансии и конкурсы', path: '/about/vacancies' },
    { label: 'Документы', path: '/about/documents' },
  ]},
  { label: 'Наука', path: '/science', children: [
    { label: 'Направления исследований', path: '/science/directions' },
    { label: 'Лаборатории', path: '/science/labs' },
    { label: 'Публикации', path: '/science/publications' },
    { label: 'Конференции', path: '/science/conferences' },
    { label: 'Международная деятельность', path: '/science/international' },
  ]},
  { label: 'Образование', path: '/education', children: [
    { label: 'ДПО РУСАЛЕН', path: '/education' },
    { label: 'Программы', path: '/education/programs' },
    { label: 'Как устроено обучение', path: '/education#how-we-teach' },
    { label: 'Преподаватели', path: '/education/team' },
    { label: 'Связи программ', path: '/education/visualization' },
  ]},
  { label: 'Проекты', path: null, children: [
    { label: 'PsyPedia', path: '/library' },
    { label: 'PsyMedia', path: '/psymedia' },
    { label: 'PsyTorg', path: '/psytorg' },
    { label: 'PsyPay', path: '/psypay' },
    { label: 'PsyTech', path: '/psytech' },
    { label: 'Psyty', path: '/psyty' },
    { label: 'Psyvent', path: '/psyvent' },
  ]},
  { label: 'Форум', path: '/forum' },
  { label: 'Контакты', path: '/contacts' },
];

function MobileNavItem({ item, location }) {
  const [open, setOpen] = useState(false);
  const isActive = item.path
    ? location.pathname.startsWith(item.path)
    : (item.children || []).some((c) => location.pathname.startsWith(c.path));

  if (!item.children) {
    return (
      <Link
        to={item.path}
        className={`block px-4 py-2.5 text-sm font-mono uppercase tracking-wider transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-mono uppercase tracking-wider transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        {item.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white/3"
          >
            {item.children.map((child) => (
              <Link
                key={child.path}
                to={child.path}
                className="flex items-center gap-2 pl-7 pr-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight className="w-3 h-3 shrink-0 opacity-40" />
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { openLeadModal } = useLeadModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-t border-border/40 ${scrolled ? 'glass py-2' : 'bg-transparent py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo className="h-[4.5rem] sm:h-[5.5rem] max-w-[60vw] object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-2">
            {navItems.map((item) => (
              <div
                key={item.path || item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children && !item.path ? (
                  <button
                    className={`px-3.5 py-2.5 text-sm font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                      item.children.some((c) => location.pathname.startsWith(c.path)) ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3.5 py-2.5 text-sm font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                      location.pathname.startsWith(item.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                  </Link>
                )}

                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 pt-2 min-w-[220px]"
                    >
                      <div className="glass rounded-lg p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={openLeadModal}
            className="hidden xl:flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            <UserCircle className="w-4 h-4" />
            Связаться
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-foreground"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden glass mt-1 mx-3 rounded-xl overflow-hidden"
          >
            <div className="py-2 max-h-[75vh] overflow-y-auto">
              {navItems.map((item) => (
                <MobileNavItem key={item.path || item.label} item={item} location={location} />
              ))}
              <div className="border-t border-border/40 mt-1 pt-1">
                <button
                  type="button"
                  onClick={openLeadModal}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  <UserCircle className="w-4 h-4" />
                  Связаться
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}