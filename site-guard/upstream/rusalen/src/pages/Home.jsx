import React from 'react';
import HeroSection from '../components/home/HeroSection';
import WhoWeArePreview from '../components/home/WhoWeArePreview';
import EcosystemGrid from '../components/home/EcosystemGrid';
import StatsSection from '../components/home/StatsSection';
import RecommendationsBlock from '../components/home/RecommendationsBlock';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhoWeArePreview />
      <EcosystemGrid />
      <StatsSection />
      <RecommendationsBlock />
    </div>
  );
}