'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Video, Eye, Clock, Share2 } from 'lucide-react';
import { getSiteConfig } from '@/lib/supabase';

export default function ShowreelPage() {
  const [config, setConfig] = useState<any>({
    showreel_url: 'https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=0&rel=0&modestbranding=1',
    showreel_views: '1.2M+',
    showreel_runtime: '2:30',
    showreel_projects: '50+'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getSiteConfig();
      if (data && data.showreel_url) {
        setConfig((prev: any) => ({ ...prev, ...data }));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 pt-12 pb-24 max-w-6xl mx-auto">
      <div className="space-y-6 mb-16 text-center lg:text-left">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>Cinematic Showcase</span>
        </motion.div>
        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight">โชว์รูล <span className="text-red-600">ล่าสุด</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl">การรวบรวมผลงานที่ดีที่สุดของฉัน ทั้งโฆษณา มิวสิควิดีโอ และงานตัดต่อเชิงสร้างสรรค์ที่เต็มไปด้วยพลัง</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative group rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl shadow-red-600/10 mb-12 bg-black"
      >
        <iframe 
          src={config.showreel_url}
          title="Showreel"
          className="w-full h-full object-cover"
          allowFullScreen
        ></iframe>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500">
            <Eye className="w-6 h-6" />
          </div>
          <p className="text-white font-bold text-2xl">{config.showreel_views}</p>
          <p className="text-slate-400 text-sm">ยอดการรับชมรวม</p>
        </div>
        
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500">
            <Clock className="w-6 h-6" />
          </div>
          <p className="text-white font-bold text-2xl">{config.showreel_runtime}</p>
          <p className="text-slate-400 text-sm">ความยาววิดีโอ</p>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500">
            <Share2 className="w-6 h-6" />
          </div>
          <p className="text-white font-bold text-2xl">{config.showreel_projects}</p>
          <p className="text-slate-400 text-sm">แบรนด์ที่เคยร่วมงาน</p>
        </div>
      </div>
    </div>
  );
}
