import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PageHero from '../../components/shared/PageHero';
import GlassCard from '../../components/shared/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, User, Calendar } from 'lucide-react';

export default function Publications() {
  const { data: pubs = [] } = useQuery({
    queryKey: ['publications'],
    queryFn: () => base44.entities.Publication.list('-created_date'),
    initialData: [],
  });

  return (
    <div>
      <PageHero label="Публикации" title="Публикации" description="Научные статьи, исследования и аналитические материалы" />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {pubs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Публикации будут добавлены в ближайшее время</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pubs.map((pub, i) => (
                <GlassCard key={pub.id} delay={i * 0.05} className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{pub.title}</h3>
                    {pub.authors && <p className="text-xs text-accent flex items-center gap-1 mb-1"><User className="w-3 h-3" />{pub.authors}</p>}
                    {pub.abstract && <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{pub.abstract}</p>}
                    <div className="flex flex-wrap gap-2">
                      {pub.journal && <Badge variant="secondary" className="text-[10px] font-mono">{pub.journal}</Badge>}
                      {pub.year && <Badge variant="outline" className="text-[10px] font-mono border-border/50"><Calendar className="w-3 h-3 mr-1" />{pub.year}</Badge>}
                      {pub.category && <Badge className="bg-primary/10 text-primary text-[10px] font-mono">{pub.category}</Badge>}
                    </div>
                  </div>
                  {pub.doi && (
                    <Button variant="ghost" size="sm" className="text-xs shrink-0">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" /> DOI
                    </Button>
                  )}
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}