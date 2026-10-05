import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useFavorites } from '@/hooks/useFavorites';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Video, Headphones, BookOpen, Database, ArrowRight, Sparkles, Heart } from 'lucide-react';

const typeConfig = {
  article:      { icon: FileText,    label: 'Статья',       color: 'text-primary',        bg: 'bg-primary/10' },
  video:        { icon: Video,       label: 'Видео',        color: 'text-accent',         bg: 'bg-accent/10' },
  audio:        { icon: Headphones,  label: 'Аудио',        color: 'text-accent',         bg: 'bg-accent/10' },
  book:         { icon: BookOpen,    label: 'Книга',        color: 'text-primary',        bg: 'bg-primary/10' },
  presentation: { icon: FileText,    label: 'Презентация',  color: 'text-primary',        bg: 'bg-primary/10' },
  dataset:      { icon: Database,    label: 'Датасет',      color: 'text-muted-foreground', bg: 'bg-secondary' },
};

function RecommendCard({ item, index }) {
  const cfg = typeConfig[item.type] || typeConfig.article;
  const Icon = cfg.icon;
  const href = item.doi || item.file_url || '/library';

  return (
    <motion.a
      href={href}
      target={href !== '/library' ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="group glass rounded-2xl p-5 flex flex-col gap-3 hover:border-primary/30 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-4 h-4 ${cfg.color}`} />
        </div>
        <span className={`text-[10px] font-mono uppercase tracking-widest mt-2 ${cfg.color}`}>
          {cfg.label}
        </span>
      </div>

      <h4 className="font-semibold text-sm leading-snug line-clamp-3 group-hover:text-primary transition-colors">
        {item.title}
      </h4>

      {item.authors && (
        <p className="text-[11px] text-muted-foreground truncate">{item.authors}</p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
        <div className="flex gap-2 flex-wrap">
          {item.topics?.slice(0, 2).map((t) => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        {item.year && (
          <span className="text-[10px] text-muted-foreground font-mono shrink-0">{item.year}</span>
        )}
      </div>
    </motion.a>
  );
}

export default function RecommendationsBlock() {
  const { favorites } = useFavorites();

  const { data: allItems = [] } = useQuery({
    queryKey: ['media-library'],
    queryFn: () => base44.entities.MediaLibraryItem.filter({ is_published: true }, '-created_date', 100),
    initialData: [],
  });

  // Build topic interest map from favorites
  const recommended = useMemo(() => {
    if (allItems.length === 0) return [];

    const favIds = new Set(favorites.map((f) => f.item_id));
    const favItems = allItems.filter((i) => favIds.has(i.id));

    // Count topic frequencies from favorites
    const topicCount = {};
    favItems.forEach((item) => {
      (item.topics || []).forEach((t) => {
        topicCount[t] = (topicCount[t] || 0) + 1;
      });
    });

    const hasFavTopics = Object.keys(topicCount).length > 0;

    // Score each non-favorited item
    const candidates = allItems.filter((i) => !favIds.has(i.id));

    if (hasFavTopics) {
      const scored = candidates.map((item) => {
        const score = (item.topics || []).reduce((acc, t) => acc + (topicCount[t] || 0), 0);
        return { item, score };
      });
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, 4).map((s) => s.item);
    }

    // No favorites yet — show latest items
    return candidates.slice(0, 4);
  }, [allItems, favorites]);

  if (allItems.length === 0) return null;

  const hasFavs = favorites.length > 0;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/4 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {hasFavs ? 'На основе ваших интересов' : 'Рекомендуем'}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              {hasFavs ? 'Вам может понравиться' : 'Актуальные материалы'}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
              {hasFavs
                ? 'Подборка на основе тем, которые вы добавили в избранное'
                : 'Свежие статьи, лекции и книги из открытой библиотеки РУСАЛЕН'}
            </p>
          </div>

          <Link
            to="/library"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            Вся библиотека <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Cards grid */}
        {recommended.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommended.map((item, i) => (
              <RecommendCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-12 text-center"
          >
            <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-muted-foreground text-sm">
              Добавьте материалы в избранное в{' '}
              <Link to="/library" className="text-primary hover:underline">библиотеке</Link>
              {' '}— и мы подберём похожие
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}