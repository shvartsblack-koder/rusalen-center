import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, Star, Search, Zap, BookOpen, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const typeColors = {
  full_time: 'bg-blue-500/10 text-blue-700', part_time: 'bg-purple-500/10 text-purple-700',
  remote: 'bg-emerald-500/10 text-emerald-700', contract: 'bg-amber-500/10 text-amber-700',
};
const typeLabels = {
  full_time: 'Полная занятость', part_time: 'Частичная', remote: 'Удалённо', contract: 'Контракт', internship: 'Стажировка',
};

export default function Employment() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('jobs');

  const { data: jobs = [] } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => base44.entities.JobListing.filter({ is_active: true }, '-created_date', 50),
  });

  const filtered = jobs.filter(j =>
    j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.company?.toLowerCase().includes(search.toLowerCase()) ||
    j.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground mb-1">Центр занятости</h1>
        <p className="text-muted-foreground">Трудоустройство для ветеранов и людей с ПТСР</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {([['jobs', 'Вакансии'], ['ai', 'AI-подбор'], ['resume', 'Резюме'], ['education', 'Обучение']]).map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border whitespace-nowrap transition-all ${tab === v ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/40'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'jobs' && (
        <>
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по вакансиям, компаниям, городам..." className="pl-9 rounded-xl" />
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Вакансии не найдены. Попробуйте изменить запрос.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((j, i) => (
                <motion.div key={j.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                    </div>
                    {j.veteran_friendly && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500" />Ветерану
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{j.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{j.company}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[j.type] || 'bg-muted text-muted-foreground'}`}>
                      {typeLabels[j.type] || j.type}
                    </span>
                    {j.city && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{j.city}
                      </span>
                    )}
                  </div>
                  {(j.salary_from || j.salary_to) && (
                    <p className="text-sm font-semibold text-foreground mb-3">
                      {j.salary_from && `от ${j.salary_from.toLocaleString()}`}
                      {j.salary_to && ` до ${j.salary_to.toLocaleString()}`} ₽
                    </p>
                  )}
                  <Button size="sm" variant="outline" className="w-full rounded-xl text-xs">Откликнуться</Button>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'ai' && (
        <div className="bg-card rounded-2xl border border-border p-8 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-display font-bold text-foreground text-xl mb-2">AI-подбор вакансий</h3>
          <p className="text-muted-foreground mb-6">На основе вашего профиля, навыков и предпочтений AI подберёт наиболее подходящие вакансии</p>
          <Button className="w-full rounded-xl">Начать AI-подбор</Button>
        </div>
      )}

      {tab === 'resume' && (
        <div className="bg-card rounded-2xl border border-border p-8 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="font-display font-bold text-foreground text-xl mb-2">Конструктор резюме</h3>
          <p className="text-muted-foreground mb-6">Создайте профессиональное резюме с учётом военного опыта и гражданских компетенций</p>
          <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700">Создать резюме</Button>
        </div>
      )}

      {tab === 'education' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'IT и программирование', desc: 'Python, веб-разработка, аналитика данных', color: 'bg-blue-500/10' },
            { title: 'Охрана и безопасность', desc: 'Корпоративная безопасность, аудит', color: 'bg-slate-500/10' },
            { title: 'Логистика и управление', desc: 'Цепочки поставок, складская логистика', color: 'bg-amber-500/10' },
            { title: 'Психология и социальная работа', desc: 'Кризисная помощь, социальная реабилитация', color: 'bg-purple-500/10' },
          ].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-5 hover:border-primary/40 transition-all cursor-pointer">
              <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center mb-3`}>
                <BookOpen className="w-5 h-5 text-foreground/60" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
              <Button size="sm" variant="outline" className="mt-4 rounded-xl text-xs">Подробнее</Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}