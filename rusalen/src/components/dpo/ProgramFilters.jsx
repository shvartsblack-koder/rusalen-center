import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { MAX_HOURS } from '@/components/dpo/programsData';

const CHECK_OPTIONS = [
  { value: 'certificate', label: 'Сертификат' },
  { value: 'qualification', label: 'Повышение квалификации' },
  { value: 'retraining', label: 'Профпереподготовка' },
];

export default function ProgramFilters({
  hoursRange,
  onHoursRangeChange,
  checks,
  onToggleCheck,
  onReset,
  hasActiveFilters,
  count,
}) {
  return (
    <div className="glass rounded-xl p-6 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:items-center">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Количество часов
            </span>
            <span className="font-mono text-xs text-primary/90">
              от {hoursRange[0]} до {hoursRange[1] === MAX_HOURS ? `${MAX_HOURS}+` : hoursRange[1]} ч
            </span>
          </div>
          <Slider
            value={hoursRange}
            onValueChange={onHoursRangeChange}
            min={0}
            max={MAX_HOURS}
            step={8}
            minStepsBetweenThumbs={1}
            aria-label="Диапазон часов"
          />
          <div className="flex justify-between mt-2 font-mono text-[10px] text-muted-foreground/60">
            <span>0</span>
            <span>{MAX_HOURS}+</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:min-w-[280px]">
          {CHECK_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer select-none">
              <Checkbox
                checked={checks.includes(opt.value)}
                onCheckedChange={() => onToggleCheck(opt.value)}
              />
              <span className="text-sm text-muted-foreground">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
        <span className="text-xs font-mono text-muted-foreground/70">
          Найдено направлений: {count}
        </span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-xs gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Сбросить фильтры
          </Button>
        )}
      </div>
    </div>
  );
}