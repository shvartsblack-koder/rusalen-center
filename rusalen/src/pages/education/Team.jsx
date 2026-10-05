import React, { useEffect } from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import TeacherCard from '@/components/education/TeacherCard';
import { teachers } from '@/components/education/educationModel';

const PAGE_TITLE = 'Преподаватели ДПО — РУСАЛЕН';
const PAGE_DESCRIPTION =
  'Публичные карточки преподавателей программ ДПО РУСАЛЕН: подтверждённые роли и зоны компетенции.';

export default function Team() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const publicTeachers = teachers.filter((t) => t.public);

  return (
    <div className="pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Преподаватели"
          title="Кто учит на программах ДПО"
          description="Мы публикуем только подтверждённые публичные роли и зоны компетенции. Карточки дополняются по мере подтверждения данных."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {publicTeachers.map((t, i) => (
            <TeacherCard key={t.id} teacher={t} delay={(i % 3) * 0.08} />
          ))}
        </div>
      </div>
    </div>
  );
}