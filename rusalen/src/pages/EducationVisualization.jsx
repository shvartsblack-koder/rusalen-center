import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CurriculumMap from '@/components/curriculum/CurriculumMap';

const PAGE_TITLE = '3D-карта образовательных маршрутов РУСАЛЕН';
const PAGE_DESCRIPTION =
  'Интерактивная 3D-карта обучения РУСАЛЕН: модули, программы, prerequisites, перезачёт, маршруты и специализации.';

export default function EducationVisualization() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;
    let meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta?.getAttribute('content') || '';
    if (meta) {
      meta.setAttribute('content', PAGE_DESCRIPTION);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      meta.setAttribute('content', PAGE_DESCRIPTION);
      document.head.appendChild(meta);
    }
    return () => {
      document.title = prevTitle;
      meta.setAttribute('content', prevDescription);
    };
  }, []);

  return (
    <div className="pt-28 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
              Модель образовательных маршрутов
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              Связи <span className="text-gold-gradient">программ и блоков</span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mt-3">
              Один учебный блок существует в модели один раз и входит в несколько программ. Карта интерактивна:
              вращайте её, выбирайте программу-кластер или отдельный модуль, чтобы увидеть маршрут, связи и перезачёт.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="border-primary/40 hover:bg-primary/10 text-xs">
            <Link to="/education">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Назад в раздел ДПО
            </Link>
          </Button>
        </div>
        <CurriculumMap />
      </div>
    </div>
  );
}