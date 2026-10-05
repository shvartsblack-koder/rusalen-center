import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PageHero from '../components/shared/PageHero';
import GlassCard from '../components/shared/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Calendar, MapPin, Banknote, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const tabs = [
  { value: 'all', label: 'Все' },
  { value: 'procurement', label: 'Госзакупки' },
  { value: 'competition', label: 'Конкурсы' },
  { value: 'grant', label: 'Гранты' },
];

const statusLabels = { open: 'Открыт', closed: 'Закрыт', in_review: 'На рассмотрении' };
const statusColors = { open: 'bg-accent/10 text-accent', closed: 'bg-muted text-muted-foreground', in_review: 'bg-primary/10 text-primary' };

export default function PsyTorg() {
  const [activeTab, setActiveTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: grants = [] } = useQuery({
    queryKey: ['grants'],
    queryFn: () => base44.entities.Grant.list(),
    initialData: [],
  });

  const filtered = grants.filter((g) => {
    if (activeTab !== 'all' && g.category !== activeTab) return false;
    if (statusFilter !== 'all' && g.status !== statusFilter) return false;
    return true;
  });

  return (
    <div>
      <PageHero
        label="PsyTorg"
        title="Закупки, конкурсы и гранты"
        description="Платформа для государственных закупок, конкурсов, грантов и профессиональных возможностей в сфере психологии, образования и исследований"
      />

      <section className="py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors ${
                  activeTab === tab.value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground glass'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="ml-auto flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-secondary border-border text-sm">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="open">Открытые</SelectItem>
                  <SelectItem value="closed">Закрытые</SelectItem>
                  <SelectItem value="in_review">На рассмотрении</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-2">Актуальные предложения будут размещены в ближайшее время</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((g, i) => (
                <GlassCard key={g.id} delay={i * 0.08}>
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`${statusColors[g.status] || 'bg-muted text-muted-foreground'} text-[10px] font-mono`}>
                      {statusLabels[g.status] || g.status}
                    </Badge>
                    {g.category && (
                      <Badge variant="outline" className="text-[10px] font-mono border-border/50">
                        {g.category === 'procurement' ? 'Госзакупки' : g.category === 'competition' ? 'Конкурс' : 'Грант'}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{g.title}</h3>
                  {g.description && <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{g.description}</p>}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {g.amount && <span className="flex items-center gap-1"><Banknote className="w-3 h-3" /> {g.amount}</span>}
                    {g.deadline && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> до {format(new Date(g.deadline), 'd MMM yyyy', { locale: ru })}</span>}
                    {g.region && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {g.region}</span>}
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}