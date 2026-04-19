'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVisibleItems } from '@/lib/supabase';

const INITIAL_EXPERIENCES = [
  {
    title: "บรรณาธิการวิดีโอมืออาชีพและนักปรับสี (Colorist)",
    company: "Skyline Media House",
    location: "กรุงเทพฯ, ประเทศไทย",
    date_range: "2021 - ปัจจุบัน",
    description: "หัวหน้าทีมตัดต่อสำหรับแคมเปญโฆษณาระดับประเทศ รับผิดชอบการเกรดสีขั้นสุดท้ายและการปรับแต่งคอนเทนต์ให้เหมาะสมกับแต่ละแพลตฟอร์ม",
    highlights: [
      "ลดระยะเวลาการทำงานลง 30% ด้วยการพัฒนาระบบ Asset Pipeline",
      "ได้รับรางวัล 'Best Commercial Edit 2023' จากการประกวดระดับภูมิภาค",
      "ดูแลทีมตัดต่อรุ่นเยาว์ 4 คน และจัดการโปรเจกต์ขนาดใหญ่พร้อมกัน"
    ]
  },
  {
    title: "โปรดิวเซอร์คอนเทนต์สร้างสรรค์",
    company: "Vibe Agency",
    location: "Remote / Singapore",
    date_range: "2018 - 2021",
    description: "เน้นการสร้างวิดีโอที่เป็นกระแสในโซเชียลมีเดียและสารคดีสั้นสำหรับแบรนด์ไลฟ์สไตล์ชั้นนำ",
    highlights: [
      "ริเริ่มกลยุทธ์ 'TikTok First' เพิ่มยอดการมีส่วนร่วมของลูกค้าได้กว่า 200%",
      "ส่งมอบงานวิดีโอกว่า 150 ชิ้นต่อเดือนภายใต้ตารางงานที่กระชั้นชิด",
      "พัฒนาเทมเพลต Motion Graphics สำหรับใช้งานภายในเอเจนซี่"
    ]
  }
];

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getVisibleItems('experience');
      if (data && data.length > 0) {
        setExperiences(data);
      } else {
        setExperiences(INITIAL_EXPERIENCES);
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
    <div className="px-4 md:px-12 pt-12 pb-24 max-w-5xl mx-auto">
      <div className="space-y-6 mb-20 text-center lg:text-left">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>เส้นทางอาชีพของฉัน</span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">ประวัติ <span className="text-red-600">การทำงาน</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl">ไทม์ไลน์ความสำเร็จและประสบการณ์การทำงานในวงการโปรดักชั่นและงานหลังการผลิต (Post-production)</p>
      </div>

      <div className="relative border-l-2 border-white/10 ml-4 md:ml-6 space-y-16">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-12 group"
          >
            {/* Dot on line */}
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#0f0f0f] border-2 border-red-600 group-hover:scale-125 transition-transform duration-300 z-10" />
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-red-600 blur-sm group-hover:blur-md transition-all duration-300 opacity-50" />

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-8">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-red-500 transition-colors">{exp.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-slate-400 font-medium">
                    <span className="text-red-500">{exp.company}</span>
                    <span className="hidden md:inline text-white/20">|</span>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1.5 text-slate-500" />
                      {exp.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-red-500" />
                  {exp.date_range}
                </div>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-3xl">
                {exp.description}
              </p>

              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-red-500" />
                  ความสำเร็จที่สำคัญ
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Array.isArray(exp.highlights) ? exp.highlights : []).map((highlight: string, hIndex: number) => (
                    <div key={hIndex} className="flex items-start p-4 rounded-2xl bg-black/20 border border-white/5 transition-colors hover:border-red-500/20 group/item">
                      <div className="w-2 h-2 rounded-full bg-red-600 mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                      <p className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
