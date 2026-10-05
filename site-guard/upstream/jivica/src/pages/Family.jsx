import React from 'react';
import { motion } from 'framer-motion';
import { Users, Bell, BookOpen, Phone, Shield, Heart, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const instructions = [
  { title: 'Признаки кризисного состояния', items: ['Резкие перепады настроения', 'Самоизоляция и отказ от общения', 'Нарушения сна, кошмары', 'Повышенная тревожность', 'Вспышки гнева или раздражительности'] },
  { title: 'Как помочь в момент криза', items: ['Говорите спокойно и тихо', 'Не спорьте и не критикуйте', 'Предложите воду или чай', 'Помогите выйти на свежий воздух', 'Оставайтесь рядом, не оставляйте одного'] },
  { title: 'Когда вызывать помощь', items: ['Угрозы самоповреждения', 'Полная потеря контакта с реальностью', 'Агрессия, опасная для окружающих', 'Состояние острого психоза', 'Потеря сознания'] },
];

export default function Family() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-1">Семейный кабинет</h1>
        <p className="text-muted-foreground">Поддержка для близких ветеранов и людей с ПТСР</p>
      </div>

      {/* Access Request */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900 mb-1">Доступ по согласию</h3>
            <p className="text-sm text-amber-800 mb-3">Мониторинг состояния доступен только с разрешения самого пользователя. Функция семейного доступа должна быть активирована в профиле.</p>
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 rounded-xl">Запросить доступ</Button>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Monitoring mock */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Heart className="w-4 h-4 text-primary" />Мониторинг состояния</h3>
          <div className="space-y-3">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <div>
                <div className="text-sm font-medium text-emerald-900">AI Score: 28 — Стабильное</div>
                <div className="text-xs text-emerald-700">Последнее обновление: сегодня, 14:32</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-3 bg-muted/30 rounded-xl">
                <div className="text-muted-foreground text-xs mb-1">Последний визит к специалисту</div>
                <div className="font-medium">3 дня назад</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-xl">
                <div className="text-muted-foreground text-xs mb-1">Сессий в этом месяце</div>
                <div className="font-medium">4 сессии</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" />Уведомления о кризисах</h3>
          <div className="space-y-2 mb-4">
            {[
              { date: '05.06.2026', type: 'Panic Swipe активирован', level: 'high' },
              { date: '03.06.2026', type: 'AI Score вырос до 45', level: 'medium' },
            ].map((n, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${n.level === 'high' ? 'bg-red-50 border border-red-100' : 'bg-amber-50 border border-amber-100'}`}>
                <AlertTriangle className={`w-4 h-4 shrink-0 ${n.level === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{n.type}</div>
                  <div className="text-xs text-muted-foreground">{n.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" />SMS уведомления подключены</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" />Email уведомления подключены</div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Phone className="w-4 h-4 text-primary" />Связь со специалистом</h3>
        <p className="text-sm text-muted-foreground mb-4">В случае кризисной ситуации вы можете обратиться к специалисту от имени вашего близкого.</p>
        <div className="flex gap-3">
          <Button className="rounded-xl flex-1"><Phone className="w-4 h-4 mr-2" />Позвонить специалисту</Button>
          <Button variant="outline" className="rounded-xl flex-1">Написать в чат</Button>
        </div>
      </div>

      {/* Instructions */}
      <h2 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />Инструкции для близких</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {instructions.map((section, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground text-sm mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}