import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PageHero from '../components/shared/PageHero';
import GlassCard from '../components/shared/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Headphones, Clock, User } from 'lucide-react';

const tabs = [
  { value: 'all', label: 'Все' },
  { value: 'channels', label: 'Наши каналы' },
  { value: 'programs', label: 'Программы' },
  { value: 'interviews', label: 'Интервью' },
];

export default function PsyMedia() {
  const [activeTab, setActiveTab] = useState('all');

  const { data: media = [] } = useQuery({
    queryKey: ['media'],
    queryFn: () => base44.entities.MediaContent.list(),
    initialData: [],
  });

  const filtered = activeTab === 'all' ? media : media.filter((m) => m.category === activeTab);

  return (
    <div>
      <PageHero
        label="PsyMedia"
        title="Медиа-платформа"
        description="Платформа РУСАЛЕН для дискуссий, интервью, образовательного и развивающего контента"
      />

      <section className="py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2">
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
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-2">Контент будет опубликован в ближайшее время</p>
              <p className="text-xs text-muted-foreground/60">Следите за обновлениями</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <GlassCard key={item.id} delay={i * 0.08}>
                  {item.image_url && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 -mx-2 -mt-2 relative group">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.type === 'video' ? <Play className="w-10 h-10 text-white" /> : <Headphones className="w-10 h-10 text-white" />}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-[10px] font-mono">
                      {item.type === 'video' ? 'Видео' : item.type === 'audio' ? 'Аудио' : 'Статья'}
                    </Badge>
                    {item.duration && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="w-3 h-3" /> {item.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  {item.guest && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <User className="w-3 h-3" /> {item.guest}
                    </p>
                  )}
                  {item.topic && <p className="text-xs text-muted-foreground mb-3">{item.topic}</p>}
                  <Button size="sm" variant="outline" className="border-border/50 text-xs w-full">
                    {item.type === 'video' ? 'Смотреть' : 'Слушать'}
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