import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText, Video, Headphones, BookOpen,
  Database, ExternalLink, Download, Clock, User, Calendar, Heart
} from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

const typeConfig = {
  article: { icon: FileText, label: 'Статья', color: 'text-primary' },
  video: { icon: Video, label: 'Видео', color: 'text-accent' },
  audio: { icon: Headphones, label: 'Аудио', color: 'text-accent' },
  book: { icon: BookOpen, label: 'Книга', color: 'text-primary' },
  presentation: { icon: FileText, label: 'Презентация', color: 'text-primary' },
  dataset: { icon: Database, label: 'Датасет', color: 'text-muted-foreground' },
};

const langLabels = { ru: 'РУС', en: 'ENG', other: '...' };

export default function LibraryItemCard({ item, index }) {
  const cfg = typeConfig[item.type] || typeConfig.article;
  const Icon = cfg.icon;
  const { favoritedIds, toggle } = useFavorites();
  const isFav = favoritedIds.has(item.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="glass rounded-xl p-5 hover:border-primary/20 transition-all duration-300 flex flex-col gap-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
          <Icon className={`w-5 h-5 ${cfg.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-1">{item.title}</h3>
          {item.authors && (
            <p className="text-[11px] text-muted-foreground flex items-center gap-1 truncate">
              <User className="w-3 h-3 shrink-0" /> {item.authors}
            </p>
          )}
        </div>
        <button
          onClick={() => toggle(item)}
          title={isFav ? 'Убрать из избранного' : 'Добавить в избранное'}
          className={`shrink-0 p-1.5 rounded-lg transition-colors ${
            isFav ? 'text-red-400 hover:text-red-300' : 'text-muted-foreground hover:text-red-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>
      </div>

      {item.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
      )}

      {/* Topics */}
      {item.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.topics.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
              {t}
            </span>
          ))}
          {item.topics.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
              +{item.topics.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        <Badge variant="secondary" className="text-[10px] font-mono">{cfg.label}</Badge>
        {item.language && (
          <Badge variant="outline" className="text-[10px] font-mono border-border/50">
            {langLabels[item.language] || item.language}
          </Badge>
        )}
        {item.year && (
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {item.year}
          </span>
        )}
        {item.duration && (
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {item.duration}
          </span>
        )}
        {item.journal && (
          <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">{item.journal}</span>
        )}
      </div>

      {/* Action */}
      {(item.file_url || ((item.type === 'video' || item.type === 'audio') && item.doi)) && (
        <a href={item.file_url || item.doi} target="_blank" rel="noopener noreferrer" className="mt-1">
          <Button size="sm" variant="outline" className="w-full border-border/50 text-xs gap-2">
            {item.type === 'video'
              ? <><Video className="w-3.5 h-3.5" /> Смотреть</>
              : item.type === 'audio'
              ? <><Headphones className="w-3.5 h-3.5" /> Слушать</>
              : <><Download className="w-3.5 h-3.5" /> Открыть</>}
          </Button>
        </a>
      )}
    </motion.div>
  );
}