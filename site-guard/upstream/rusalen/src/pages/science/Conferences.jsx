import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PageHero from '../../components/shared/PageHero';
import GlassCard from '../../components/shared/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const typeLabels = { conference: 'Конференция', seminar: 'Семинар', workshop: 'Воркшоп', webinar: 'Вебинар' };

export default function Conferences() {
  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.list('-date'),
    initialData: [],
  });

  return (
    <div>
      <PageHero label="Конференции" title="Конференции и мероприятия" description="Научные конференции, семинары и профессиональные мероприятия РУСАЛЕН" />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {events.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Мероприятия будут анонсированы в ближайшее время</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((e, i) => (
                <GlassCard key={e.id} delay={i * 0.08}>
                  {e.image_url && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 -mx-2 -mt-2">
                      <img src={e.image_url} alt={e.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {e.type && <Badge variant="secondary" className="text-[10px] font-mono">{typeLabels[e.type] || e.type}</Badge>}
                    {e.date && <Badge variant="outline" className="text-[10px] font-mono border-border/50"><Calendar className="w-3 h-3 mr-1" />{format(new Date(e.date), 'd MMM yyyy', { locale: ru })}</Badge>}
                  </div>
                  <h3 className="font-semibold mb-2">{e.title}</h3>
                  {e.location && <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</p>}
                  {e.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{e.description}</p>}
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}