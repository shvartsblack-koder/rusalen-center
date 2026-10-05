import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PageHero from '../../components/shared/PageHero';
import GlassCard from '../../components/shared/GlassCard';
import { FileText, Download, Shield, Award, ScrollText, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryLabels = {
  charter: { label: 'Уставные документы', icon: ScrollText },
  license: { label: 'Лицензии', icon: Shield },
  certificate: { label: 'Сертификаты', icon: Award },
  regulation: { label: 'Положения', icon: FileText },
  partnership: { label: 'Партнёрские соглашения', icon: Handshake },
};

const placeholderDocs = [
  { category: 'charter', items: ['Устав организации', 'Свидетельство о регистрации', 'Учредительный договор'] },
  { category: 'license', items: ['Лицензия на образовательную деятельность', 'Лицензия на научную деятельность'] },
  { category: 'certificate', items: ['Сертификат ISO 9001', 'Аккредитация образовательных программ'] },
  { category: 'regulation', items: ['Положение об образовательной деятельности', 'Положение о научной деятельности', 'Внутренний регламент'] },
  { category: 'partnership', items: ['Типовой договор о партнёрстве', 'Рамочное соглашение о сотрудничестве'] },
];

export default function Documents() {
  const { data: docs = [] } = useQuery({
    queryKey: ['documents'],
    queryFn: () => base44.entities.Document.list(),
    initialData: [],
  });

  return (
    <div>
      <PageHero label="Документы" title="Документы" description="Уставные документы, лицензии, сертификаты и положения РУСАЛЕН" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {docs.length === 0 ? (
            placeholderDocs.map((group, gi) => {
              const cat = categoryLabels[group.category];
              const Icon = cat?.icon || FileText;
              return (
                <div key={gi}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{cat?.label}</h3>
                  </div>
                  <div className="space-y-2">
                    {group.items.map((item, i) => (
                      <GlassCard key={i} delay={i * 0.05} className="flex items-center justify-between !p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{item}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            Object.keys(categoryLabels).map((catKey) => {
              const catDocs = docs.filter((d) => d.category === catKey);
              if (catDocs.length === 0) return null;
              const cat = categoryLabels[catKey];
              const Icon = cat.icon;
              return (
                <div key={catKey}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{cat.label}</h3>
                  </div>
                  <div className="space-y-2">
                    {catDocs.map((doc, i) => (
                      <GlassCard key={doc.id} delay={i * 0.05} className="flex items-center justify-between !p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{doc.title}</span>
                        </div>
                        {doc.file_url && (
                          <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                              <Download className="w-3.5 h-3.5" />
                            </Button>
                          </a>
                        )}
                      </GlassCard>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}