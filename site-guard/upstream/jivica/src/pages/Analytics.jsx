import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, AlertTriangle, Clock, TrendingUp, MapPin, Activity, Shield } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const weekData = [
  { day: 'Пн', requests: 12, resolved: 10 }, { day: 'Вт', requests: 18, resolved: 15 },
  { day: 'Ср', requests: 9, resolved: 9 }, { day: 'Чт', requests: 22, resolved: 18 },
  { day: 'Пт', requests: 15, resolved: 12 }, { day: 'Сб', requests: 8, resolved: 7 },
  { day: 'Вс', requests: 6, resolved: 6 },
];

const geoData = [
  { city: 'Москва', value: 28 }, { city: 'СПб', value: 16 },
  { city: 'Краснодар', value: 12 }, { city: 'Ростов', value: 9 },
  { city: 'Прочие', value: 35 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const scoreData = [
  { month: 'Янв', avg: 42 }, { month: 'Фев', avg: 38 }, { month: 'Мар', avg: 35 },
  { month: 'Апр', avg: 30 }, { month: 'Май', avg: 28 }, { month: 'Июн', avg: 26 },
];

export default function Analytics() {
  const { data: incidents = [] } = useQuery({ queryKey: ['incidents-all'], queryFn: () => base44.entities.CrisisIncident.list('-created_date', 100) });
  const { data: profiles = [] } = useQuery({ queryKey: ['profiles-all'], queryFn: () => base44.entities.UserProfile.list('-created_date', 100) });

  const kpis = [
    { label: 'Пользователей', value: '12 847', change: '+8.2%', icon: Users, color: 'text-blue-500' },
    { label: 'Кризисных запросов', value: incidents.length || '2 193', change: '-3.1%', icon: AlertTriangle, color: 'text-red-500' },
    { label: 'Среднее время ответа', value: '4.2 мин', change: '-12%', icon: Clock, color: 'text-emerald-500' },
    { label: 'Эффективность', value: '94.6%', change: '+2.3%', icon: TrendingUp, color: 'text-amber-500' },
    { label: 'Активных специалистов', value: '386', change: '+14', icon: Shield, color: 'text-purple-500' },
    { label: 'AI Crisis Score (avg)', value: '31.2', change: '-4.8', icon: Activity, color: 'text-teal-500' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-1">Аналитический центр</h1>
        <p className="text-muted-foreground">Статистика платформы для государственных кураторов</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {kpis.map((k, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl border border-border p-4">
            <k.icon className={`w-5 h-5 ${k.color} mb-2`} />
            <div className="text-xl font-display font-bold text-foreground">{k.value}</div>
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className={`text-xs mt-1 font-medium ${k.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{k.change}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Requests chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Обращения за неделю</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
              <Bar dataKey="requests" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Обращения" />
              <Bar dataKey="resolved" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Решено" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Score Trend */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Средний AI Crisis Score</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
              <Line type="monotone" dataKey="avg" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 4 }} name="AI Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Geo distribution */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />География обращений</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={geoData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {geoData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {geoData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-muted-foreground">{d.city}</span>
                  </div>
                  <span className="font-semibold">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Escalation funnel */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Воронка эскалации</h3>
          <div className="space-y-3">
            {[
              { label: 'AI Ассистент', value: 100, count: '2 193' },
              { label: 'Консультант', value: 38, count: '832' },
              { label: 'Психолог', value: 18, count: '394' },
              { label: 'Психиатр', value: 6, count: '131' },
              { label: 'Экстренные', value: 1.2, count: '26' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-28 shrink-0">{s.label}</span>
                <div className="flex-1 h-6 bg-muted rounded-lg overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.value}%` }} transition={{ delay: i * 0.1 }}
                    className="h-full rounded-lg bg-primary/70 flex items-center px-2">
                  </motion.div>
                </div>
                <span className="text-xs font-semibold text-foreground w-10 text-right">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}