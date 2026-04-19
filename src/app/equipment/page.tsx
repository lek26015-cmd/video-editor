'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Monitor, HardDrive, Cpu, Sparkles, Layout } from 'lucide-react';
import { getVisibleItems } from '@/lib/supabase';

const INITIAL_GEAR = [
  {
    category: "เวิร์กสเตชันการตัดต่อ",
    icon_name: 'Cpu',
    name: "Mac Studio M2 Ultra",
    detail: "128GB RAM, 4TB SSD"
  },
  {
    category: "เวิร์กสเตชันการตัดต่อ",
    icon_name: 'Cpu',
    name: "Pro Display XDR",
    detail: "32-inch 6K Retina"
  },
  {
    category: "ชุดซอฟต์แวร์ระดับมืออาชีพ",
    icon_name: 'Layout',
    name: "DaVinci Resolve Studio",
    detail: "Primary Color & Edit"
  },
  {
    category: "กล้องและเลนส์",
    icon_name: 'Camera',
    name: "Sony FX6",
    detail: "Main Cinema Body"
  }
];

export default function EquipmentPage() {
  const [gear, setGear] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getVisibleItems('equipment');
      if (data && data.length > 0) {
        setGear(data);
      } else {
        setGear(INITIAL_GEAR);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Group gear by category
  const groupedGear = gear.reduce((acc: any, item: any) => {
    if (!acc[item.category]) acc[item.category] = { items: [], icon_name: item.icon_name };
    acc[item.category].items.push(item);
    return acc;
  }, {});

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
          <span>เครื่องมือระดับมืออาชีพ</span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">อุปกรณ์ที่ <span className="text-red-600">เลือกใช้</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl">การผสมผสานฮาร์ดแวร์และซอฟต์แวร์ระดับไฮเอนด์เข้ากับทักษะทางเทคนิค เพื่อส่งมอบงานหลังการผลิตที่มอบคุณภาพในระดับสูงสุด</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(groupedGear).map(([category, group]: [string, any], gIndex) => {
          const IconComponent = {
            Cpu, Layout, Camera, Monitor, HardDrive
          }[group.icon_name as string] || Camera;

          return (
            <motion.div
              key={gIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gIndex * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-red-500/20 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">{category}</h2>
              </div>

              <ul className="space-y-4">
                {group.items.map((item: any, iIndex: number) => (
                  <li key={iIndex} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="space-y-0.5">
                      <p className="text-white font-semibold text-base">{item.name}</p>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">{item.detail}</p>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600/50" />
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
