import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar, ChevronDown } from 'lucide-react';

const CATEGORY_LABEL = {
  conference: 'Конференция',
  forum: 'Форум',
  exhibition: 'Выставка',
};

export default function NewsFeedItem({ article, index = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const date = article.date || article.created_date;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      className="glass rounded-xl overflow-hidden hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        {article.image_url && (
          <div className="md:w-64 shrink-0 aspect-video md:aspect-auto md:h-auto">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-6 flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {date && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-primary">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(date), 'd MMMM yyyy', { locale: ru })}
              </span>
            )}
            {article.category && (
              <span className="text-[10px] uppercase tracking-widest font-mono px-2.5 py-1 rounded-full border border-primary/30 text-primary/80">
                {CATEGORY_LABEL[article.category] || article.category}
              </span>
            )}
          </div>
          <h3 className="font-heading text-lg font-semibold mb-2">{article.title}</h3>
          {article.summary && <p className="text-sm text-muted-foreground mb-3">{article.summary}</p>}
          {article.content && (
            <div>
              <p
                className={`text-sm text-muted-foreground/90 leading-relaxed whitespace-pre-line ${
                  expanded ? '' : 'line-clamp-3'
                }`}
              >
                {article.content}
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
              >
                {expanded ? 'Свернуть' : 'Читать полностью'}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}