import React from 'react';

export default function PlanModuleCard({ module, index }) {
  const h = module.hours;
  return (
    <div className="glass rounded-xl p-5 sm:p-6 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-mono text-2xl text-primary/40 leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80 border border-border rounded-full px-2.5 py-1 whitespace-nowrap">
          Контроль: {module.control}
        </span>
      </div>
      <h4 className="font-semibold mb-3 leading-snug">{module.title}</h4>
      <p className="font-mono text-[11px] text-primary/80 mb-4">
        Всего {h.total} ч · Лекции {h.lecture} · Практика {h.practice} · Самост. {h.self}
      </p>
      <ul className="space-y-1.5 mt-auto">
        {module.lectures.map((l) => (
          <li key={l.title} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
            <span className="text-primary/60 shrink-0">•</span>
            <span>
              {l.title}
              <span className="font-mono text-muted-foreground/60"> — {l.hours} акад. ч.</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}