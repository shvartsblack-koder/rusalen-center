import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Shield, Heart, Edit3, Save, Camera, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const roleLabels = {
  veteran: 'Ветеран', psychologist: 'Психолог', crisis_consultant: 'Кризисный консультант',
  psychiatrist: 'Психиатр', hotline_operator: 'Оператор', center_coordinator: 'Координатор',
  employer: 'Работодатель', admin: 'Администратор', government_curator: 'Гос. куратор', family_member: 'Семья',
};

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    base44.auth.me().then(u => { setUser(u); setForm({ full_name: u?.full_name || '', email: u?.email || '' }); }).catch(() => {});
  }, []);

  const { data: profile } = useQuery({
    queryKey: ['my-profile'],
    queryFn: () => base44.entities.UserProfile.filter({}, '-created_date', 1),
    select: d => d[0],
  });

  const crisisColors = {
    green: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    yellow: 'bg-amber-500/10 text-amber-600 border-amber-200',
    orange: 'bg-orange-500/10 text-orange-600 border-orange-200',
    red: 'bg-red-500/10 text-red-600 border-red-200',
  };

  const tabs = ['Профиль', 'Психологический профиль', 'История обращений', 'Документы'];
  const [tab, setTab] = useState(0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Личный кабинет</h1>

      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-display font-bold text-foreground">{user?.full_name || 'Пользователь'}</h2>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {roleLabels[profile?.role || 'veteran']}
              </span>
              {profile?.crisis_status && (
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${crisisColors[profile.crisis_status]}`}>
                  AI Score: {profile.crisis_score || 0} · {profile.crisis_status === 'green' ? 'Стабильное' : profile.crisis_status === 'yellow' ? 'Внимание' : profile.crisis_status === 'orange' ? 'Поддержка' : 'Кризис'}
                </span>
              )}
            </div>
          </div>
          <Button variant={editing ? 'default' : 'outline'} onClick={() => setEditing(!editing)} className="rounded-xl shrink-0">
            {editing ? <><Save className="w-4 h-4 mr-2" />Сохранить</> : <><Edit3 className="w-4 h-4 mr-2" />Редактировать</>}
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`flex-1 min-w-max text-sm font-medium py-2 px-3 rounded-lg transition-all ${tab === i ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Полное имя', value: user?.full_name, icon: User },
            { label: 'Email', value: user?.email, icon: User },
            { label: 'Телефон', value: profile?.phone || 'Не указан', icon: Phone },
            { label: 'Город', value: profile?.city || 'Не указан', icon: MapPin },
            { label: 'Воинская часть', value: profile?.military_unit || 'Не указано', icon: Shield },
            { label: 'Период службы', value: profile?.service_period || 'Не указано', icon: FileText },
          ].map((f, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-1">
                <f.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{f.label}</span>
              </div>
              {editing ? (
                <Input className="mt-1 h-8 text-sm" defaultValue={f.value} />
              ) : (
                <div className="font-medium text-sm text-foreground">{f.value}</div>
              )}
            </div>
          ))}
          <div className="sm:col-span-2 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-800 text-sm">Экстренный контакт</div>
                <div className="text-sm text-amber-700 mt-1">
                  {profile?.emergency_contact_name || 'Не указан'} · {profile?.emergency_contact_phone || 'Телефон не указан'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Heart className="w-4 h-4 text-primary" />Диагнозы</h3>
            {profile?.diagnoses?.length ? (
              <div className="flex flex-wrap gap-2">{profile.diagnoses.map((d, i) => <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{d}</span>)}</div>
            ) : <p className="text-muted-foreground text-sm">Информация не указана</p>}
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-3">Медицинская информация</h3>
            <p className="text-muted-foreground text-sm">{profile?.medical_info || 'Не указана'}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Динамика AI Crisis Score</h3>
            <div className="space-y-2">
              {[{ d: '11.06.2026', s: 28 }, { d: '10.06.2026', s: 32 }, { d: '09.06.2026', s: 45 }, { d: '08.06.2026', s: 38 }].map((e, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-24">{e.d}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${e.s < 35 ? 'bg-emerald-500' : e.s < 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${e.s}%` }} />
                  </div>
                  <span className="text-xs font-semibold w-8">{e.s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 2 && (
        <div className="space-y-3">
          {[
            { date: '10.06.2026', type: 'AI Ассистент', status: 'Завершено', color: 'bg-emerald-500' },
            { date: '08.06.2026', type: 'Консультация психолога', status: 'Завершено', color: 'bg-blue-500' },
            { date: '05.06.2026', type: 'Panic Swipe', status: 'Закрыто', color: 'bg-red-500' },
          ].map((a, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${a.color}`} />
              <div className="flex-1">
                <div className="font-medium text-sm">{a.type}</div>
                <div className="text-xs text-muted-foreground">{a.date}</div>
              </div>
              <span className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground">{a.status}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 3 && (
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Загрузка документов доступна после верификации профиля</p>
          <Button variant="outline" className="mt-4 rounded-xl">Верифицировать профиль</Button>
        </div>
      )}
    </div>
  );
}