import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PageHero from '../components/shared/PageHero';
import SectionHeader from '../components/shared/SectionHeader';
import LibraryItemCard from '../components/library/LibraryItemCard';
import FreudAssistant from '../components/psypedia/FreudAssistant';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

const TYPE_TABS = [
  { value: 'all', label: 'Все' },
  { value: 'article', label: 'Статьи' },
  { value: 'video', label: 'Видео-лекции' },
  { value: 'audio', label: 'Аудио' },
  { value: 'book', label: 'Книги' },
  { value: 'presentation', label: 'Презентации' },
  { value: 'dataset', label: 'Датасеты' },
];

const RESEARCH_TOPICS = [
  'Интегративная психология',
  'Психосоматика',
  'Исследования сознания',
  'Цифровая психология',
  'Нейронаука',
  'Психотерапия',
  'AI и психика',
  'Телесные практики',
  'Психология зависимостей',
  'Клиническая психология',
];

export default function MediaLibrary() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [activeTopic, setActiveTopic] = useState('');

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['media-library'],
    queryFn: () => base44.entities.MediaLibraryItem.filter({ is_published: true }, '-created_date', 100),
    initialData: [],
  });

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (activeType !== 'all' && item.type !== activeType) return false;
      if (activeTopic && !item.topics?.includes(activeTopic)) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const inTitle = item.title?.toLowerCase().includes(q);
        const inAuthors = item.authors?.toLowerCase().includes(q);
        const inDesc = item.description?.toLowerCase().includes(q);
        const inTopics = item.topics?.some((t) => t.toLowerCase().includes(q));
        const inJournal = item.journal?.toLowerCase().includes(q);
        if (!inTitle && !inAuthors && !inDesc && !inTopics && !inJournal) return false;
      }
      return true;
    });
  }, [items, activeType, activeTopic, search]);

  // Collect all topics from actual data + default list
  const allTopics = useMemo(() => {
    const fromData = items.flatMap((i) => i.topics || []);
    return [...new Set([...RESEARCH_TOPICS, ...fromData])].sort();
  }, [items]);

  return (
    <div>
      <PageHero
        label="PsyPedia"
        title="Библиотека знаний"
        description="Открытая библиотека по психологии, психосоматике и исследованиям сознания — статьи, книги, видео, аудио. Поиск по темам, авторам и направлениям."
      />

      {/* Search + filters */}
      <section className="sticky top-16 z-20 bg-background/80 backdrop-blur-md border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию, автору, теме..."
              className="pl-10 pr-10 bg-secondary/50 border-border/50 focus:border-primary"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type tabs */}
          <div className="flex flex-wrap gap-2">
            {TYPE_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveType(tab.value)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors ${
                  activeType === tab.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground glass'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-8">
          {/* Sidebar topics */}
          <aside className="hidden lg:block w-56 shrink-0">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Темы исследований
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTopic('')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                  !activeTopic ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                Все темы
              </button>
              {allTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(activeTopic === topic ? '' : topic)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                    activeTopic === topic
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </aside>

          {/* Mobile topic chips */}
          <div className="lg:hidden flex flex-wrap gap-2 mb-4 w-full">
            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(activeTopic === topic ? '' : topic)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors border ${
                  activeTopic === topic
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/50 text-muted-foreground hover:border-primary/30'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {/* Count & active filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs text-muted-foreground font-mono">
                {isLoading ? 'Загрузка...' : `${filtered.length} материалов`}
              </span>
              {activeTopic && (
                <span className="flex items-center gap-1 text-[11px] bg-primary/10 text-primary px-2 py-1 rounded-full font-mono">
                  {activeTopic}
                  <button onClick={() => setActiveTopic('')}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="glass rounded-xl p-5 animate-pulse h-52" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-muted-foreground text-sm">Материалы не найдены</p>
                <p className="text-muted-foreground/60 text-xs mt-1">Попробуйте изменить запрос или фильтры</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((item, i) => (
                  <LibraryItemCard key={item.id} item={item} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Freud AI assistant */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Нейронный ассистент"
            title="Что бы сказал Фрейд?"
            description="Задайте вопрос нейронному ассистенту, вдохновлённому классиками психологии"
          />
          <FreudAssistant />
        </div>
      </section>
    </div>
  );
}