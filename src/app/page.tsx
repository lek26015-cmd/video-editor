'use client';

import React from 'react';
import { HeroSection } from '@/components/sections/hero-section';
import { ResumeSection } from '@/components/sections/resume-section';
import { PortfolioSection } from '@/components/sections/portfolio-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ResumeSection />
      <PortfolioSection />
    </div>
  );
}
