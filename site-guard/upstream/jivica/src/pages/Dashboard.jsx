import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Shield, Heart, MapPin, MessageCircle, Users, AlertTriangle, TrendingUp, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

const crisisColors = {
  green: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-200', label: 'Стабильное' },
  yellow: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-200', label: 'Внимание' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-200', label: 'Поддержка' },
  red: { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-200', label: 'Кризис' },
};

const quickActions = [
  { to: '/emergency', icon: AlertTriangle, label: 'Экстренная помощь', color: 'bg-red-500 hover:bg-red-600 text-white', urgent: true },
  { to: '/ai-assistant', icon: Brain, label: 'AI Ассистент', color: 'bg-primary hover:bg-primary/90 text-white' },
  { to: '/specialists', icon: Heart, label: 'Специалисты', color: 'bg-card hover:bg-muted border border-border text-foreground' },
  { to: '/self-help', icon: Zap, label: 'Самопомощь', color: 'bg-card hover:bg-muted border border-border text-foreground' },
  { to: '/help-map', icon: MapPin, label: 'Карта помощи', color: 'bg-card hover:bg-muted border border-border text-foreground' },
  { to: '/community', icon: Users, label: 'Сообщество', color: 'bg-card hover:bg-muted border border-border text-foreground' },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    base44.auth.me().then(u => setUser(u)).catch(() => {});
    base44.entities.UserProfile.filter({}, '-created_date', 1).then(d => setProfile(d[0])).catch(() => {});
  }, []);

  const crisisStatus = profile?.crisis_status || 'green';
  const crisisScore = profile?.crisis_score || 0;
  const cc = crisisColors[crisisStatus];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">
          Добро пожаловать{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
        </h1>
        <p className="text-muted-foreground mt-1">Платформа «ЖИВИЦА» — ваш надёжный помощник</p>

      </motion.div>

      {/* Crisis Score Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className={`rounded-2xl border ${cc.border} ${cc.bg} p-6 mb-6`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/50 flex items-center justify-center shrink-0">
            <Activity className={`w-6 h-6 sm:w-7 sm:h-7 ${cc.text}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-muted-foreground">AI Crisis Score</div>
            <div className={`text-3xl font-display font-bold ${cc.text}`}>{crisisScore}</div>
            <div className={`text-sm font-medium ${cc.text}`}>{cc.label} состояние</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(crisisScore, 100)}%` }} transition={{ delay: 0.3, duration: 0.8 }}
              className={`h-full rounded-full ${crisisStatus === 'green' ? 'bg-emerald-500' : crisisStatus === 'yellow' ? 'bg-amber-500' : crisisStatus === 'orange' ? 'bg-orange-500' : 'bg-red-500'}`} />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Link to="/ai-monitoring">
            <Button variant="outline" size="sm" className="rounded-xl whitespace-nowrap">Подробнее</Button>
          </Link>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <h2 className="font-display font-semibold text-foreground mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickActions.map((a, i) => (
            <Link key={i} to={a.to}>
              <motion.div whileTap={{ scale: 0.97 }}
                className={`flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 p-4 rounded-xl transition-all cursor-pointer text-center sm:text-left ${a.color} ${a.urgent ? 'ring-2 ring-red-500/30' : ''}`}>
                <a.icon className="w-5 h-5 shrink-0" />
                <span className="text-xs sm:text-sm font-medium leading-tight">{a.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Status Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h2 className="font-display font-semibold text-foreground mb-4">Сводка</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: TrendingUp, label: 'Динамика за 7 дней', value: 'Улучшение', color: 'text-emerald-500' },
            { icon: MessageCircle, label: 'Последняя сессия', value: '3 дня назад', color: 'text-blue-500' },
            { icon: Shield, label: 'Статус платформы', value: '24/7 онлайн', color: 'text-primary' },
          ].map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="text-sm font-semibold text-foreground">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}