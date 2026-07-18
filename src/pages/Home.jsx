import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ExploreSection from '../components/sections/ExploreSection';
import AstronautLogSection from '../components/sections/AstronautLogSection';
import JourneyTimelineSection from '../components/sections/JourneyTimelineSection';
import DesignThinkingSection from '../components/sections/DesignThinkingSection';
import VaultSection from '../components/sections/VaultSection';
import CommandCenterSection from '../components/sections/CommandCenterSection';
import CosmosStatsSection from '../components/sections/CosmosStatsSection';
import ObservatorySection from '../components/sections/ObservatorySection';
import MissionControlSection from '../components/sections/MissionControlSection';

const Home = () => {
  return (
    <main className="bg-apple-bg text-apple-text font-body overflow-hidden">
      <HeroSection />
      <ExploreSection />
      <AstronautLogSection />
      <JourneyTimelineSection />
      <DesignThinkingSection />
      <VaultSection />
      <CommandCenterSection />
      <CosmosStatsSection />
      <ObservatorySection />
      <MissionControlSection />
    </main>
  );
};

export default Home;
