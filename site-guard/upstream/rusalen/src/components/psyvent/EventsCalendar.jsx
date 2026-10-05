import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import SectionHeader from '@/components/shared/SectionHeader';
import TicketDialog from '@/components/psyvent/TicketDialog';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Ticket, Mic, Presentation, Users, Zap, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const FORMAT_META = {
  talk: { label: 'Выступление', icon: Mic },
  seminar: { label: 'Семинар', icon: Presentation },
  training: { label: 'Тренинг', icon: Users },
  intensive: { label: 'Интенсив', icon: Zap },
  other: { label: 'Событие', icon: CalendarDays },
};

export default function EventsCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    base44.entities.PsyventEvent.filter({ is_published: true }, 'date', 100)
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = events
    .filter((e) => e.date && new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const groups = [];
  let lastMonth = null;
  upcoming.forEach((e) => {
    const m = format(new Date(e.date), 'LLLL yyyy', { locale: ru });
    if (m !== lastMonth) {
      groups.push({ month: m, items: [] });
      lastMonth = m;
    }
    groups[groups.length - 1].items.push(e);
  });

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Календарь событий"
          title="Ближайшие мероприятия"
          description="Выступления, семинары, тренинги и интенсивы с мировыми звёздами психологии"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center py-16 glass rounded-2xl">
            <CalendarDays className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
            <p className="text-muted-foreground text-sm">Анонсы новых событий появятся в ближайшее время</p>
            <p className="text-muted-foreground/60 text-xs mt-1">Подпишитесь на обновления ниже</p>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.month} className="mb-10 last:mb-0">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
                {group.month}
              </h3>
              <div className="space-y-3">
                {group.items.map((event) => {
                  const meta = FORMAT_META[event.format] || FORMAT_META.other;
                  const Icon = meta.icon;
                  return (
                    <div key={event.id} className="glass rounded-xl p-5 flex flex-col sm:flex-row gap-5 hover:border-primary/30 transition-all">
                      <div className="flex sm:flex-col items-center justify-center w-full sm:w-20 shrink-0 rounded-lg bg-primary/10 py-2 sm:py-3">
                        <span className="font-display text-3xl font-bold text-primary">
                          {format(new Date(event.date), 'd')}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-primary/70">
                          {format(new Date(event.date), 'EEEEEE', { locale: ru })} · {format(new Date(event.date), 'MMM', { locale: ru })}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-primary/80">
                            <Icon className="w-3 h-3" /> {meta.label}
                          </span>
                          {event.time && (
                            <span className="text-[10px] font-mono text-muted-foreground">{event.time}</span>
                          )}
                        </div>
                        {event.star && (
                          <p className="text-sm text-gold-gradient font-semibold">{event.star}</p>
                        )}
                        <h4 className="font-display text-lg font-medium mb-1">{event.title}</h4>
                        {event.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{event.description}</p>
                        )}
                        {event.location && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {event.location}
                          </p>
                        )}
                      </div>
                      <div className="flex sm:flex-col items-center justify-between sm:justify-end gap-3 shrink-0">
                        <span className="text-primary font-semibold">
                          {event.price ? `${event.price.toLocaleString()} ₽` : 'Бесплатно'}
                        </span>
                        <Button onClick={() => setSelected(event)} className="gap-2 text-xs">
                          <Ticket className="w-4 h-4" /> Купить билет
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
      <TicketDialog event={selected} onClose={() => setSelected(null)} />
    </section>
  );
}