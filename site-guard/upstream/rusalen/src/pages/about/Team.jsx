import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PageHero from '../../components/shared/PageHero';
import GlassCard from '../../components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { User, ChevronRight } from 'lucide-react';

const placeholderTeam = [
  { name: 'Руководство', members: [
    { name: 'Имя Фамилия', position: 'Генеральный директор', specialization: 'Стратегическое управление, организационная психология' },
    { name: 'Имя Фамилия', position: 'Научный директор', specialization: 'Клиническая психология, нейронаука' },
    { name: 'Имя Фамилия', position: 'Директор по образованию', specialization: 'Педагогическая психология, дидактика' },
  ]},
  { name: 'Научные сотрудники', members: [
    { name: 'Имя Фамилия', position: 'Ведущий исследователь', specialization: 'Психосоматика, интегративная медицина' },
    { name: 'Имя Фамилия', position: 'Старший научный сотрудник', specialization: 'Цифровая психология, AI' },
    { name: 'Имя Фамилия', position: 'Научный сотрудник', specialization: 'Телесно-ориентированная терапия' },
  ]},
];

export default function Team() {
  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team'],
    queryFn: () => base44.entities.TeamMember.list('order'),
    initialData: [],
  });

  const displayData = teamMembers.length > 0 ? null : placeholderTeam;

  return (
    <div>
      <PageHero label="Команда" title="Наша команда" description="Международная команда учёных, психологов и визионеров" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {displayData ? (
            displayData.map((group, gi) => (
              <div key={gi} className="mb-12">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6">{group.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.members.map((m, i) => (
                    <GlassCard key={i} delay={i * 0.1}>
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                        <User className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h4 className="font-semibold mb-1">{m.name}</h4>
                      <p className="text-sm text-primary font-mono text-xs mb-2">{m.position}</p>
                      <p className="text-xs text-muted-foreground mb-4">{m.specialization}</p>
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1 p-0">
                        Подробнее <ChevronRight className="w-3 h-3" />
                      </Button>
                    </GlassCard>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((m, i) => (
                <GlassCard key={m.id} delay={i * 0.08}>
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 overflow-hidden">
                    {m.photo_url ? (
                      <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <h4 className="font-semibold mb-1">{m.name}</h4>
                  <p className="text-xs text-primary font-mono mb-2">{m.position}</p>
                  {m.specialization && <p className="text-xs text-muted-foreground mb-4">{m.specialization}</p>}
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1 p-0">
                    Подробнее <ChevronRight className="w-3 h-3" />
                  </Button>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}