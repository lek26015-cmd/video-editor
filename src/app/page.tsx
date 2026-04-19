'use client';

import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CategoryFilter } from '@/components/portfolio/category-filter';
import { VideoCard } from '@/components/portfolio/video-card';
import { mockVideos } from '@/lib/data';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

const CATEGORIES: Category[] = ['All', 'Horizontal', 'Vertical'];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'All') return mockVideos;
    return mockVideos.filter(v => v.orientation === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  return (
    <div className="px-4 md:px-8 py-6 max-w-[2400px] mx-auto">
      {/* Category Tabs */}
      <div className="sticky top-14 z-30 bg-[#0f0f0f] pt-2 mb-4">
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Video Grid */}
      <motion.div 
        layout
        className={cn(
          "grid gap-x-4 gap-y-8",
          // Adapt grid based on orientation
          selectedCategory === 'Vertical' 
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" 
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <p className="text-lg font-medium">No videos found in this category.</p>
        </div>
      )}
    </div>
  );
}
