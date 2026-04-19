'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Video, Sparkles, Wand2, MonitorPlay, FileText } from 'lucide-react';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/supabase';

export function HeroSection() {
  const [config, setConfig] = React.useState<any>({
    hero_title: 'บรรณาธิการวิดีโอและนักเล่าเรื่องเชิงสร้างสรรค์',
    hero_subtitle: 'ประสบการณ์กว่า 10 ปีในการเนรมิตฟุตเทจให้เป็นผลงานระดับพรีเมียม พร้อมร่วมงานและเติบโตไปกับทีมโปรดักชันชั้นนำ',
    availability: 'เปิดรับโอกาสร่วมงานในโปรเจกต์ใหม่และตำแหน่งงานประจำ'
  });

  React.useEffect(() => {
    async function loadConfig() {
      const data = await getSiteConfig();
      if (data && Object.keys(data).length > 0) {
        setConfig((prev: any) => ({ ...prev, ...data }));
      }
    }
    loadConfig();
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center px-4 md:px-12 pt-24 pb-12 overflow-hidden border-b border-white/5">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-red-600/10 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-red-600/5 blur-[120px] rounded-full animate-pulse delay-700" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 relative z-10"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>{config.availability}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight">
            {config.hero_title}
          </h1>
          
          <p className="text-slate-400 text-xl md:text-2xl leading-relaxed max-w-2xl">
            {config.hero_subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="#portfolio">
              <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold flex items-center transition-all shadow-xl shadow-red-600/20 hover:scale-105 active:scale-95 uppercase tracking-wider">
                EXPLORE PORTFOLIO <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
            <Link href="#resume">
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold flex items-center border border-white/10 transition-all hover:scale-105 active:scale-95 uppercase tracking-wider">
                <FileText className="mr-2 w-5 h-5" /> VIEW RESUME
              </button>
            </Link>
          </div>

          <div className="flex items-center space-x-8 pt-8 border-t border-white/5">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-white">100+</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">PROJECTS COMPLETED</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">TRUSTED BRANDS</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-white">10Y+</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">EXPERIENCE</p>
            </div>
          </div>
        </motion.div>

        {/* Featured Preview Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
            <Image 
              src="/editor_profile.png" 
              alt="Editor Working" 
              fill 
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-8 left-8 right-8 p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 space-y-4">
              <div className="flex items-center space-x-2 text-red-500">
                <Video className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">CERTIFIED EDITOR</span>
              </div>
              <h3 className="text-2xl font-bold text-white">การตัดต่อที่ผสานศิลปะและเทคนิค</h3>
              <p className="text-slate-300 text-sm">พร้อมนำประสบการณ์จากโปรเจกต์ระดับสากลมาพัฒนาผลงานร่วมกับทีมของคุณ</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
