import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Network } from 'lucide-react';
import ProgramFilters from '@/components/dpo/ProgramFilters';
import AnnouncementCard from '@/components/dpo/AnnouncementCard';
import ProgramStatusCard from '@/components/education/ProgramStatusCard';
import { PROGRAMS, MAX_HOURS } from '@/components/dpo/programsData';

const PAGE_TITLE = 'Выбрать программу — каталог ДПО РУСАЛЕН';
const PAGE_DESCRIPTION =
  'Каталог программ ДПО РУСАЛЕН: активные программы и ближайшие запуски, направления в подготовке. Фильтр по часам и документу об обучении.';

export default function EducationPrograms() {
  const [hoursRange, setHoursRange] = useState([0, MAX_HOURS]);
  const [checks, setChecks] = useState([]);

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

  const hoursActive = hoursRange[0] > 0 || hoursRange[1] < MAX_HOURS;

  const filtered = PROGRAMS.filter((p) => {
    if (hoursActive) {
      const total = p.hours?.total;
      if (!total || total < hoursRange[0] || total > hoursRange[1]) return false;
    }
    if (checks.length) {
      const matches = checks.some((c) =>
        c === 'certificate' ? p.hasCertificate : p.docTypes?.includes(c)
      );
      if (!matches) return false;
    }
    return true;
  });

  const active = filtered.filter((p) => p.status === 'open' || p.status === 'upcoming');
  const announced = filtered.filter((p) => p.status === 'announced');

  const toggleCheck = (value) =>
    setChecks((prev) => (prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]));

  const resetFilters = () => {
    setHoursRange([0, MAX_HOURS]);
    setChecks([]);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div>
        <section className="relative pt-36 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
              Каталог программ
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Выбрать <span className="text-gold-gradient">программу</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Сначала — программы с открытым набором и ближайшие запуски, ниже — направления в
              подготовке. Отфильтруйте по объёму часов и нужному документу об обучении; по анонсам
              можно запросить информацию о запуске.
            </p>
            <Link
              to="/education/visualization"
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary underline underline-offset-4 hover:opacity-80"
            >
              <Network size={15} />
              Посмотреть карту связей программ
            </Link>
          </div>
        </section>
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ProgramFilters
              hoursRange={hoursRange}
              onHoursRangeChange={setHoursRange}
              checks={checks}
              onToggleCheck={toggleCheck}
              onReset={resetFilters}
              hasActiveFilters={hoursActive || checks.length > 0}
              count={filtered.length}
            />
            {filtered.length === 0 ? (
              <div className="glass rounded-xl p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  По этим условиям направлений пока нет. Попробуйте расширить диапазон часов или
                  убрать часть галочек.
                </p>
                <button
                  onClick={resetFilters}
                  className="text-primary underline underline-offset-4 hover:opacity-80"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <>
                {active.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {active.map((p) => (
                      <ProgramStatusCard key={p.id} program={p} />
                    ))}
                  </div>
                )}
                {announced.length > 0 && (
                  <div>
                    <h2 className="font-display text-xl font-bold mb-4">Направления в подготовке</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {announced.map((p, i) => (
                        <AnnouncementCard key={p.id} item={p} delay={(i % 3) * 0.08} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}