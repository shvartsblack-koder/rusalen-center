import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/shared/SectionHeader';
import TeacherCard from './TeacherCard';
import { teachers } from './educationModel';

export default function TeachersPreview() {
  const publicTeachers = teachers.filter((t) => t.public);

  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Преподаватели"
          title="Кто ведёт обучение"
          description="Мы публикуем только подтверждённые публичные роли и зоны компетенции."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {publicTeachers.map((t, i) => (
            <TeacherCard key={t.id} teacher={t} delay={(i % 3) * 0.08} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/education/team"
            className="text-sm text-primary underline underline-offset-4 hover:opacity-80"
          >
            Все преподаватели ДПО
          </Link>
        </div>
      </div>
    </section>
  );
}