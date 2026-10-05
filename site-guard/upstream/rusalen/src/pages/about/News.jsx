import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PageHero from '../../components/shared/PageHero';
import NewsFeedItem from '@/components/news/NewsFeedItem';
import { Newspaper } from 'lucide-react';

const FILTERS = [
  { value: 'all', label: 'Все события' },
  { value: 'conference', label: 'Конференции' },
  { value: 'forum', label: 'Форумы' },
  { value: 'exhibition', label: 'Выставки' },
];

export default function News() {
  const [filter, setFilter] = useState('all');

  const { data: news = [], isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: () => base44.entities.NewsArticle.list('-created_date', 200),
    initialData: [],
  });

  const groups = useMemo(() => {
    const sorted = news
      .map((a) => ({ ...a, sort_date: a.date || a.created_date }))
      .sort((x, y) => new Date(y.sort_date) - new Date(x.sort_date));
    const filtered = filter === 'all' ? sorted : sorted.filter((a) => a.category === filter);
    const result = [];
    let currentYear = null;
    for (const article of filtered) {
      const year = new Date(article.sort_date).getFullYear();
      if (year !== currentYear) {
        currentYear = year;
        result.push({ year, items: [] });
      }
      result[result.length - 1].items.push(article);
    }
    return result;
  }, [news, filter]);

  return (
    <div>
      <PageHero
        label="Новости"
        title="Новости РУСАЛЕН"
        description="Лента участия центра в выставках, форумах и конференциях с 2023 года. Обновляется каждую неделю."
      />

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  filter === f.value
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="glass rounded-xl h-48 animate-pulse" />
              ))}
            </div>
          ) : groups.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-10 h-10 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">В этой категории новостей пока нет</p>
            </div>
          ) : (
            <div className="space-y-6">
              {groups.map((group) => (
                <div key={group.year}>
                  <div className="flex items-center gap-4 pt-6 pb-6">
                    <h2 className="font-display text-3xl font-bold text-gold-gradient">{group.year}</h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="space-y-6">
                    {group.items.map((article, i) => (
                      <NewsFeedItem key={article.id} article={article} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}