'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CategoryFilter } from '@/components/portfolio/category-filter';
import { VideoCard } from '@/components/portfolio/video-card';
import { VideoModal } from '@/components/portfolio/video-modal';
import { mockVideos } from '@/lib/data';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getVisibleItems } from '@/lib/supabase';

const CATEGORIES: Category[] = ['ALL', 'HORIZONTAL', 'VERTICAL'];

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getVisibleItems('projects');
      if (data && data.length > 0) {
        setVideos(data);
      } else {
        setVideos(mockVideos);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'ALL') return videos;
    const orientation = selectedCategory === 'HORIZONTAL' ? 'horizontal' : 'vertical';
    return videos.filter(v => v.orientation === orientation);
  }, [selectedCategory, videos]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section id="portfolio" className="px-4 md:px-8 py-24 max-w-[2400px] mx-auto scroll-mt-14">
      {/* Category Tabs */}
      <div className="sticky top-14 z-30 bg-[#0f0f0f]/80 backdrop-blur-md pt-2 pb-4 mb-4">
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div className="mb-12 space-y-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight uppercase underline decoration-red-600 decoration-4 underline-offset-8">
          WORK <span className="text-red-600">PORTFOLIO</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">รวบรวมผลงานตัดต่อหลากหลายสไตล์ คัดเลือกเฉพาะงานคุณภาพสูงเพื่อพิสูจน์ฝีมือระดับมืออาชีพ</p>
      </div>

      {/* Video Grid */}
      <motion.div 
        layout
        className={cn(
          "grid gap-x-4 gap-y-8",
          selectedCategory === 'VERTICAL' 
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" 
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} onClick={setSelectedVideo} />
          ))}
        </AnimatePresence>
      </motion.div>

      <VideoModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <p className="text-lg font-medium">No videos found in this category</p>
        </div>
      )}
    </section>
  );
}
