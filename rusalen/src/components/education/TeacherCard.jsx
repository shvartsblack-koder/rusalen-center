import React from 'react';
import GlassCard from '@/components/shared/GlassCard';

export default function TeacherCard({ teacher, delay = 0, className = '' }) {
  const initials = teacher.name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const roles = teacher.publicRoles || [];

  return (
    <GlassCard delay={delay} className={`flex flex-col h-full ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        {teacher.photo ? (
          <img
            src={teacher.photo}
            alt={teacher.name}
            className="w-14 h-14 rounded-full object-cover border border-primary/30 shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-secondary border border-primary/30 font-display text-lg font-bold text-primary shrink-0">
            {initials}
          </div>
        )}
        <h4 className="font-semibold text-base leading-tight">{teacher.name}</h4>
      </div>
      {roles.length ? (
        <div className="space-y-1 mb-3">
          {roles.map((r) => (
            <p key={r} className="text-xs text-muted-foreground leading-snug">{r}</p>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground/60 mb-3">Публичная карточка уточняется</p>
      )}
    </GlassCard>
  );
}