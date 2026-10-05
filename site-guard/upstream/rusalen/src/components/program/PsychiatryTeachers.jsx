import React from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import TeacherCard from '@/components/education/TeacherCard';
import { psychiatryFamily, teacherById } from '@/components/education/educationModel';

export default function PsychiatryTeachers() {
  const ids = [...new Set(psychiatryFamily().flatMap((p) => p.teachers))];
  const list = ids.map(teacherById).filter(Boolean);

  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Преподаватели"
          title="Кто ведёт программу"
          description="Публикуются только подтверждённые публичные роли и зоны компетенции."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {list.map((t, i) => (
            <TeacherCard key={t.id} teacher={t} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}