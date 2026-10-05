import React, { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import EduHero from '@/components/education/EduHero';
import StudyNowSection from '@/components/education/StudyNowSection';
import HowWeTeach from '@/components/education/HowWeTeach';
import DirectionsSection from '@/components/education/DirectionsSection';
import TeachersPreview from '@/components/education/TeachersPreview';
import EnvironmentSection from '@/components/education/EnvironmentSection';
import ExperimentalProgramsSection from '@/components/education/ExperimentalProgramsSection';
import NextStepSection from '@/components/education/NextStepSection';

const PAGE_TITLE = 'ДПО РУСАЛЕН — программы для психологов и профессиональное развитие';
const PAGE_DESCRIPTION =
  'Клиническая грамотность, психотерапевтические методы, психофизиология и профильные специализации в связанной системе подготовки психолога. Программы ДПО РУСАЛЕН.';

export default function Education() {
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
        <EduHero />
        <StudyNowSection />
        <HowWeTeach />
        <DirectionsSection />
        <TeachersPreview />
        <EnvironmentSection />
        <ExperimentalProgramsSection />
        <NextStepSection />
      </div>
    </MotionConfig>
  );
}