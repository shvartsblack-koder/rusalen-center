import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Star, Clock, MessageCircle, Phone, Video, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const mockSpecialists = [
  { id: '1', name: 'Елена Михайлова', role: 'Психолог', specialization: 'ПТСР, боевая травма', experience_years: 12, rating: 4.9, reviews: 87, status: 'online', bio: 'Специалист по работе с ветеранами боевых действий. Когнитивно-поведенческая терапия.' },
  { id: '2', name: 'Андрей Козлов', role: 'Психиатр', specialization: 'ПТСР, депрессия', experience_years: 18, rating: 4.8, reviews: 124, status: 'busy', bio: 'Психиатр высшей категории. Лечение тревожных расстройств и депрессии.' },
  { id: '3', name: 'Ольга Петрова', role: 'Кризисный консультант', specialization: 'Кризисное реагирование', experience_years: 8, rating: 4.7, reviews: 63, status: 'online', bio: 'Экстренная психологическая помощь, суицидальная профилактика.' },
  { id: '4', name: 'Сергей Новиков', role: 'Психолог', specialization: 'Реабилитация, травматерапия', experience_years: 10, rating: 4.6, reviews: 45, status: 'offline', bio: 'EMDR-терапия, реабилитация после боевых действий.' },
];

const statusConfig = {
  online: { label: 'Онлайн', color: 'bg-emerald-500/10 text-emerald-600', dot: 'bg-emerald-500' },
  busy: { label: 'Занят', color: 'bg-amber-500/10 text-amber-600', dot: 'bg-amber-500' },
  offline: { label: 'Недоступен', color: 'bg-muted text-muted-foreground', dot: 'bg-muted-foreground' },
};

export default function Specialists() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const displayed = filter === 'all' ? mockSpecialists : mockSpecialists.filter(s => s.status === filter);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground mb-1">Специалисты</h1>
        <p className="text-muted-foreground">Психологи, психиатры и кризисные консультанты</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[['all', 'Все'], ['online', 'Онлайн'], ['busy', 'Занят'], ['offline', 'Недоступен']].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-all ${filter === v ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/40'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {displayed.map((s, i) => {
            const sc = statusConfig[s.status];
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(s)}
                className={`bg-card rounded-2xl border p-5 cursor-pointer transition-all hover:shadow-md ${selected?.id === s.id ? 'border-primary/50 bg-primary/5' : 'border-border'}`}>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${sc.dot}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{s.name}</h3>
                        <p className="text-sm text-muted-foreground">{s.role} · {s.specialization}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full ${sc.color}`}>{sc.label}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />{s.rating}</div>
                      <div>{s.reviews} отзывов</div>
                      <div><Clock className="w-3.5 h-3.5 inline mr-1" />{s.experience_years} лет</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected ? (
          <motion.div key={selected.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl border border-border p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground text-xl">{selected.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{selected.role}</p>
              <div className={`inline-flex items-center gap-1.5 mt-2 text-xs px-3 py-1 rounded-full ${statusConfig[selected.status].color}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[selected.status].dot}`} />
                {statusConfig[selected.status].label}
              </div>
            </div>
            <div className="space-y-3 mb-6 text-sm">
              <p className="text-muted-foreground">{selected.bio}</p>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" />{selected.experience_years} лет опыта</div>
              <div className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" />{selected.rating} · {selected.reviews} отзывов</div>
            </div>
            <div className="space-y-2">
              <Button disabled={selected.status !== 'online'} className="w-full rounded-xl" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />Написать
              </Button>
              <Button variant="outline" disabled={selected.status !== 'online'} className="w-full rounded-xl" size="sm">
                <Phone className="w-4 h-4 mr-2" />Аудиозвонок
              </Button>
              <Button variant="outline" disabled={selected.status !== 'online'} className="w-full rounded-xl" size="sm">
                <Video className="w-4 h-4 mr-2" />Видеосвязь
              </Button>
              <Button variant="outline" className="w-full rounded-xl" size="sm">
                <Calendar className="w-4 h-4 mr-2" />Записаться
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-6 flex items-center justify-center text-center">
            <div>
              <User className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Выберите специалиста для просмотра профиля</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}