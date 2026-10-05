import React from 'react';
import { motion } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, Clock, Award } from 'lucide-react';
import { hoursTextFor, documentLineFor } from '@/components/education/educationModel';
import { mailtoHref } from '@/lib/mailto';

export default function AnnouncementCard({ item, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass rounded-xl p-6 flex flex-col h-full hover:border-primary/20 transition-all duration-300"
    >
      <span className="inline-block self-start font-mono text-[10px] uppercase tracking-[0.2em] border border-accent/40 text-accent rounded px-2 py-0.5 mb-4">
        Анонс
      </span>
      <h4 className="font-semibold mb-1">{item.title}</h4>
      {item.note && (
        <p className="text-xs font-mono text-muted-foreground/70 mb-1">{item.note}</p>
      )}
      {item.subtitle && (
        <p className="text-xs text-primary/90 mb-2">{item.subtitle}</p>
      )}
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{item.description}</p>
      <p className="text-xs text-muted-foreground/80 flex items-center gap-1.5 mb-1">
        <Clock className="w-3.5 h-3.5 text-primary/80" aria-hidden="true" />
        {hoursTextFor(item)}
      </p>
      <p className="text-xs text-muted-foreground/70 flex items-center gap-1.5 mb-4">
        <Award className="w-3.5 h-3.5 text-primary/70" aria-hidden="true" />
        {documentLineFor(item)}
      </p>
      <Collapsible className="mb-4">
        <CollapsibleTrigger className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors group">
          О направлении
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 text-xs text-muted-foreground/90 space-y-2">
          <p><span className="text-foreground/80">Для кого:</span> {item.audience}</p>
          <p className="text-primary/80">{item.accents}</p>
          {item.extra && <p className="text-muted-foreground/70">{item.extra}</p>}
        </CollapsibleContent>
      </Collapsible>
      <Button asChild variant="outline" size="sm" className="mt-auto self-start border-primary/40 hover:bg-primary/10 text-xs">
        <a href={mailtoHref(`ДПО РУСАЛЕН — ${item.title} — интерес к запуску`)}>
          Узнать о запуске
        </a>
      </Button>
    </motion.div>
  );
}