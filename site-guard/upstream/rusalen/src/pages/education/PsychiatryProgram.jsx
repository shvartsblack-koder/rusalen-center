import React, { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import PsychiatryHero from '@/components/program/PsychiatryHero';
import PsychiatryStages from '@/components/program/PsychiatryStages';
import PsychiatryPlan from '@/components/program/PsychiatryPlan';
import PsychiatryApproach from '@/components/program/PsychiatryApproach';
import PsychiatryTeachers from '@/components/program/PsychiatryTeachers';
import PsychiatryEnroll from '@/components/program/PsychiatryEnroll';

const PAGE_TITLE = 'Психиатрия для психологов — программы 96 и 144 часа | ДПО РУСАЛЕН';
const PAGE_DESCRIPTION =
  'Две последовательные программы повышения квалификации: клиническая грамотность и навигация (96 ч) и дифференциальная клиника и клиническая тактика (144 ч). Полный маршрут — 240 часов.';

export default function PsychiatryProgram() {
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
    <MotionConfig reducedMotion="user">
      <div>
        <PsychiatryHero />
        <PsychiatryStages />
        <PsychiatryPlan />
        <PsychiatryApproach />
        <PsychiatryTeachers />
        <PsychiatryEnroll />
      </div>
    </MotionConfig>
  );
}