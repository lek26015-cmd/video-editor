'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Wand2, MonitorPlay, Sparkles, Zap, Palette, UserCheck } from 'lucide-react';
import { getVisibleItems } from '@/lib/supabase';

const INITIAL_SERVICES = [
  {
    title: "ความเชี่ยวชาญการตัดต่อโฆษณาและแบรนด์",
    description: "เชี่ยวชาญการเล่าเรื่องเชิงสร้างสรรค์สำหรับแคมเปญโฆษณาระดับมืออาชีพ เน้นการสื่อสารทิศทางของแบรนด์และผลลัพธ์ที่เป็นเลิศ",
    icon_name: 'Video',
    features: ["การเล่าเรื่องเชิงพาณิชย์", "กระบวนการทำงานระดับสตูดิโอ", "การจัดการไฟล์และ Workflow ที่เป็นระเบียบ"]
  },
  {
    title: "ทักษะการผลิตคอนเทนต์โซเชียลมีเดียสมัยใหม่",
    description: "เข้าใจอัลกอริทึมและพฤติกรรมผู้บริโภคบนแพลตฟอร์มแนวตั้ง (TikTok/Reels) พร้อมทักษะการสร้างทรานซิชันที่น่าจดจำ",
    icon_name: 'Wand2',
    features: ["ความเชี่ยวชาญไฟล์ 9:16", "เทคนิครักษาความสนใจ (Retention Tech)", "ความเร็วในการส่งมอบงานคุณภาพ"]
  },
  {
    title: "ทักษะเกรดสีระดับภาพยนตร์ (Senior Colorist)",
    description: "ความสามารถในการควบคุมอารมณ์และโทนของภาพด้วยความแม่นยำทางเทคนิค รองรับไฟล์ LOG จากกล้องระดับ Cinema ทุกประเภท",
    icon_name: 'Palette',
    features: ["Advanced Color Grading", "เทคนิคการจับคู่สี (Color Matching)", "การสร้าง Look Profile เฉพาะโปรเจกต์"]
  },
  {
    title: "การจัดการโปรเจกต์เชิงเรื่องราว (Narrative Editing)",
    description: "ทักษะการคัดเลือกและร้อยเรียงฟุตเทจจำนวนมากให้เป็นเรื่องราวที่ทรงพลัง เหมาะสำหรับงานสารคดีและวิดีโอที่มีความยาว",
    icon_name: 'MonitorPlay',
    features: ["โครงสร้างการเล่าเรื่องที่แข็งแรง", "การจัดการเสียงและดนตรีประกอบ", "ความละเอียดรอบคอบในทุกรายละเอียด"]
  }
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getVisibleItems('services');
      if (data && data.length > 0) {
        setServices(data);
      } else {
        setServices(INITIAL_SERVICES);
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
          <span>ทักษะและความเชี่ยวชาญพิเศษ</span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">ความเชี่ยวชาญ <span className="text-red-600">เชิงเทคนิค</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl">ศักยภาพด้านงานหลังการผลิตที่ได้รับการพิสูจน์แล้วผ่านโปรเจกต์ที่หลากหลาย พร้อมประยุกต์ใช้เพื่อเป้าหมายขององค์กร</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => {
          const IconComponent = {
            Video, Wand2, Palette, MonitorPlay
          }[service.icon_name as string] || Video;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:bg-white/[0.08] relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/5 blur-3xl group-hover:bg-red-600/10 transition-colors" />
              
              <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 mb-8">
                <IconComponent className="w-8 h-8" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{service.title}</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">{service.description}</p>

              <ul className="space-y-3">
                {(Array.isArray(service.features) ? service.features : []).map((feature: string, fIndex: number) => (
                  <li key={fIndex} className="flex items-center text-sm text-slate-300">
                    <Zap className="w-4 h-4 mr-3 text-red-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-white/5">
                <div className="flex items-center text-red-500 font-bold">
                  <UserCheck className="w-5 h-5 mr-2" />
                  ทักษะที่พร้อมประยุกต์ใช้ทันที
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
