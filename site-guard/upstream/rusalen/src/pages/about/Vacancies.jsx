import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PageHero from '../../components/shared/PageHero';
import GlassCard from '../../components/shared/GlassCard';
import ApplyModal from '../../components/vacancies/ApplyModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, Send, BriefcaseBusiness } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Vacancies() {
  const [selectedVacancy, setSelectedVacancy] = useState(null);

  const { data: vacancies = [] } = useQuery({
    queryKey: ['vacancies'],
    queryFn: () => base44.entities.Vacancy.filter({ is_active: true }),
    initialData: [],
  });

  return (
    <div>
      <PageHero
        label="Вакансии"
        title="Вакансии и конкурсы"
        description="Присоединяйтесь к международной команде РУСАЛЕН"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {vacancies.length === 0 ? (
            <div className="text-center py-20">
              <BriefcaseBusiness className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-40" />
              <p className="text-muted-foreground mb-6">Актуальные вакансии будут опубликованы в ближайшее время</p>
              <Button asChild variant="outline" className="border-border/50">
                <Link to="/contacts"><Send className="w-4 h-4 mr-2" /> Отправить резюме</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vacancies.map((v, i) => (
                <GlassCard key={v.id} delay={i * 0.08}>
                  <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {v.department && (
                      <Badge variant="secondary" className="text-[10px] font-mono">
                        <Building2 className="w-3 h-3 mr-1" /> {v.department}
                      </Badge>
                    )}
                    {v.location && (
                      <Badge variant="outline" className="text-[10px] font-mono border-border/50">
                        <MapPin className="w-3 h-3 mr-1" /> {v.location}
                      </Badge>
                    )}
                  </div>
                  {v.description && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-3 leading-relaxed">{v.description}</p>
                  )}
                  {v.requirements && (
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      <span className="text-primary font-mono">Требования: </span>{v.requirements}
                    </p>
                  )}
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/80 text-xs"
                    onClick={() => setSelectedVacancy(v)}
                  >
                    <Send className="w-3 h-3 mr-1.5" /> Откликнуться
                  </Button>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedVacancy && (
        <ApplyModal
          vacancy={selectedVacancy}
          open={!!selectedVacancy}
          onClose={() => setSelectedVacancy(null)}
        />
      )}
    </div>
  );
}