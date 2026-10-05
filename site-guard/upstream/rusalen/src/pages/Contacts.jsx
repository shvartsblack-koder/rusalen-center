import React from 'react';
import PageHero from '../components/shared/PageHero';
import GlassCard from '../components/shared/GlassCard';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

const contacts = [
  { icon: MapPin, label: 'Адрес', value: '123610, Московская область, Солнечногорский район, ГП ОПХ ЦМИС' },
  { icon: Phone, label: 'Телефон', value: '+7 (495) 181-5650' },
  { icon: Mail, label: 'Email', value: 'info@rusalencenter.ru' },
  { icon: Clock, label: 'Часы работы', value: 'Пн — Пт: 9:00 — 18:00 МСК' },
  { icon: Globe, label: 'Сайт', value: 'www.rusalencenter.ru' },
];

const branches = [
  { city: 'Москва', type: 'Головной офис' },
  { city: 'Санкт-Петербург', type: 'Филиал' },
  { city: 'Новосибирск', type: 'Представительство' },
];

export default function Contacts() {
  return (
    <div>
      <PageHero
        label="Контакты"
        title="Свяжитесь с нами"
        description="Мы всегда рады ответить на ваши вопросы, обсудить сотрудничество и предложить подходящие решения"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-semibold mb-6">Контактная информация</h3>
              {contacts.map((c, i) => (
                <GlassCard key={i} delay={i * 0.08} className="flex items-center gap-4 !p-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{c.label}</span>
                    <p className="text-sm font-medium">{c.value}</p>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold mb-6">Филиалы</h3>
              <div className="space-y-4">
                {branches.map((b, i) => (
                  <GlassCard key={i} delay={i * 0.1}>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-accent shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm">{b.city}</h4>
                        <p className="text-xs text-muted-foreground">{b.type}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="glass rounded-xl mt-6 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Карта офисов РУСАЛЕН</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}