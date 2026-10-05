import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, AlertTriangle, MessageCircle, Brain, MapPin, Heart,
  Users, Briefcase, BookOpen, Shield, Settings, LogOut, ChevronLeft,
  Activity, Home, BarChart3, Headphones, UserCircle, Scale, MessageSquare
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

const navGroups = [
  {
    label: null,
    items: [
      { icon: LayoutDashboard, label: 'Главная', path: '/dashboard' },
      { icon: UserCircle, label: 'Профиль', path: '/profile' },
    ]
  },
  {
    label: 'Помощь',
    items: [
      { icon: AlertTriangle, label: 'Экстренная помощь', path: '/emergency', danger: true },
      { icon: MessageCircle, label: 'AI Ассистент', path: '/ai-assistant' },
      { icon: Brain, label: 'AI-мониторинг', path: '/ai-monitoring' },
      { icon: Heart, label: 'Антикризисный центр', path: '/self-help' },
      { icon: MapPin, label: 'Карта помощи', path: '/help-map' },
    ]
  },
  {
    label: 'Сервисы',
    items: [
      { icon: Headphones, label: 'Специалисты', path: '/specialists' },
      { icon: Briefcase, label: 'Трудоустройство', path: '/employment' },
      { icon: Users, label: 'Сообщество', path: '/community' },
      { icon: Scale, label: 'Юридическая помощь', path: '/legal' },
      { icon: Users, label: 'Семейный кабинет', path: '/family' },
      { icon: MessageSquare, label: 'Обратная связь', path: '/feedback' },
    ]
  },
  {
    label: 'Управление',
    items: [
      { icon: BarChart3, label: 'Аналитика', path: '/analytics', adminOnly: true },
      { icon: Shield, label: 'Администрирование', path: '/admin', adminOnly: true },
    ]
  }
];

export default function AppSidebar({ collapsed, setCollapsed, userRole }) {
  const location = useLocation();
  const isAdmin = userRole === 'admin' || userRole === 'government_curator';

  const handleLogout = () => {
    base44.auth.logout('/');
  };

  return (
    <motion.div
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed top-0 left-0 h-full z-40 flex flex-col overflow-hidden"
      style={{ background: 'hsl(var(--sidebar-background))' }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b shrink-0" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center">
              <img src="https://media.base44.com/images/public/6a2ad240524cbc0ab3fedc84/a034ceb6a_image.png" alt="ЖИВИЦА" className="h-9 w-auto" />
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-8 h-8 rounded-lg overflow-hidden mx-auto flex items-center justify-center">
            <img src="https://media.base44.com/images/public/6a2ad240524cbc0ab3fedc84/a034ceb6a_image.png" alt="ЖИВИЦА" className="h-8 w-8 object-contain" />
          </div>
        )}
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {collapsed && (
          <button onClick={() => setCollapsed(false)} className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto hover:bg-white/10 transition-colors text-white/50 hover:text-white mb-2">
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </button>
        )}
        {navGroups.map((group, gi) => {
          const visibleItems = group.items.filter(item => !item.adminOnly || isAdmin);
          if (!visibleItems.length) return null;
          return (
            <div key={gi} className="mb-2">
              {group.label && !collapsed && (
                <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(var(--sidebar-foreground)/0.4)' }}>
                  {group.label}
                </div>
              )}
              {visibleItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all group ${
                      active
                        ? 'bg-primary/20 text-white'
                        : item.danger
                          ? 'text-red-400 hover:bg-red-500/10'
                          : 'hover:bg-white/8 text-white/60 hover:text-white'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-primary' : ''}`} />
                    {!collapsed && (
                      <span className="text-sm font-medium truncate">{item.label}</span>
                    )}
                    {!collapsed && active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t p-3 space-y-1" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
        <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/8 text-white/50 hover:text-white transition-all">
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Настройки</span>}
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-all">
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Выйти</span>}
        </button>
      </div>
    </motion.div>
  );
}