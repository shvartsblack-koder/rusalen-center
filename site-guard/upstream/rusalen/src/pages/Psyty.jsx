import React from 'react';
import PageHero from '../components/shared/PageHero';
import IdeaSection from '../components/psyty/IdeaSection';
import PillarsSection from '../components/psyty/PillarsSection';
import CommunitySection from '../components/psyty/CommunitySection';
import InfrastructureSection from '../components/psyty/InfrastructureSection';
import RoadmapSection from '../components/psyty/RoadmapSection';
import MissionSection from '../components/psyty/MissionSection';

export const PSYTY_HERO_IMG = 'https://media.base44.com/images/public/6a8e40cf6b6b2dae667b4c8e/f787fe8df_generated_b3bd0ffb.png';

export default function Psyty() {
  return (
    <div>
      <PageHero
        label="PSYTY"
        title="Первый в мире город психологов, исследователей и учёных"
        description="Жить, учиться и работать — в своей среде. Среда для человека, исследующего и развивающего в человеке Человека."
        imageUrl={PSYTY_HERO_IMG}
      />
      <IdeaSection />
      <PillarsSection />
      <CommunitySection />
      <InfrastructureSection />
      <RoadmapSection />
      <MissionSection />
    </div>
  );
}