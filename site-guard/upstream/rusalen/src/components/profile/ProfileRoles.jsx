import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import GlassCard from '@/components/shared/GlassCard';
import { Microscope, GraduationCap, HeartPulse, Eye, Dumbbell, Home, Award, Sparkles, Loader2 } from 'lucide-react';

const ROLES = [
  { key: 'researcher', label: 'Исследователь', icon: Microscope },
  { key: 'teacher', label: 'Преподаватель', icon: GraduationCap },
  { key: 'therapist', label: 'Терапевт', icon: HeartPulse },
  { key: 'supervisor', label: 'Супервизор', icon: Eye },
  { key: 'trainer', label: 'Тренер', icon: Dumbbell },
  { key: 'resident', label: 'Резидент', icon: Home },
  { key: 'ambassador', label: 'Амбассадор', icon: Award },
];

export default function ProfileRoles({ roles = [], onChange }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const toggle = async (key) => {
    if (saving) return;
    const next = roles.includes(key) ? roles.filter((r) => r !== key) : [...roles, key];
    setSaving(true);
    setError('');
    try {
      await base44.auth.updateMe({ roles: next });
      onChange(next);
    } catch (e) {
      console.error('roles save failed', e);
      setError('Не удалось сохранить роли. Попробуйте ещё раз.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <GlassCard className="mb-12">
      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-2 flex items-center gap-2">
        <Sparkles className="w-4 h-4" /> Роли в центре
      </h3>
      <p className="text-xs text-muted-foreground mb-5">
        Отметьте роли, в которых вы участвуете в составе центра
      </p>
      <div className="flex flex-wrap gap-3">
        {ROLES.map(({ key, label, icon: Icon }) => {
          const active = roles.includes(key);
          return (
            <button
              key={key}
              onClick={() => toggle(key)}
              disabled={saving}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 disabled:opacity-60 ${
                active
                  ? 'border-primary/60 bg-primary/10 text-primary'
                  : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>
      {(saving || error) && (
        <p className={`text-xs mt-4 flex items-center gap-2 ${error ? 'text-destructive' : 'text-muted-foreground'}`}>
          {saving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Сохранение…
            </>
          ) : (
            error
          )}
        </p>
      )}
    </GlassCard>
  );
}