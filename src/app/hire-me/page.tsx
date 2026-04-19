'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, Send, Sparkles } from 'lucide-react';
import { getSiteConfig } from '@/lib/supabase';

export default function HireMePage() {
  const [config, setConfig] = useState<any>({
    contact_email: 'hello@visualeditor.com',
    contact_phone: '+66 81 234 5678',
    contact_line: '@visualeditor'
  });

  useEffect(() => {
    async function loadData() {
      const data = await getSiteConfig();
      if (data && Object.keys(data).length > 0) {
        setConfig((prev: any) => ({ ...prev, ...data }));
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Content */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            <span>พร้อมสร้างสรรค์ผลงานร่วมกับคุณ</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] uppercase"
          >
            WORK WITH A <span className="text-red-600">PROFESSIONAL</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl leading-relaxed max-w-xl"
          >
            ไม่ว่าจะเป็นโปรเจกต์ระยะสั้น หรือตำแหน่งงานประจำ ผมพร้อมนำทักษะและประสบการณ์ที่มีมาช่วยขับเคลื่อนวิสัยทัศน์ของคุณให้เป็นจริง
          </motion.p>

          <div className="space-y-6 pt-8">
            <ContactMethod 
              icon={Mail} 
              label="CONTACT EMAIL" 
              value={config.contact_email} 
              href={`mailto:${config.contact_email}`} 
            />
            <ContactMethod 
              icon={Phone} 
              label="PHONE NUMBER" 
              value={config.contact_phone} 
              href={`tel:${config.contact_phone}`} 
            />
            <ContactMethod 
              icon={MessageSquare} 
              label="Line ID" 
              value={config.contact_line} 
            />
          </div>
        </div>

        {/* Right Side: Simple Contact Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-8 backdrop-blur-xl"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">NEED AN INTERVIEW?</h2>
            <p className="text-slate-400">คุณสามารถส่งรายละเอียดโปรเจกต์หรือตำแหน่งงานเบื้องต้นมาได้ทางช่องทางต่างๆ ด้านข้าง ผมจะติดต่อกลับภายใน 24 ชั่วโมงครับ</p>
          </div>

          <div className="p-8 rounded-3xl bg-red-600/10 border border-red-600/20">
            <h3 className="text-red-500 font-bold mb-2 flex items-center uppercase text-xs tracking-[0.2em]">
              <Sparkles className="w-4 h-4 mr-2" /> CURRENT STATUS
            </h3>
            <p className="text-sm text-slate-300">ยินดีรับทั้งงาน Full-time, Contract, หรือ Freelance High-end Projects ทั่วประเทศไทยและต่างประเทศ (Remote)</p>
          </div>

          <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-red-600/20 flex items-center justify-center group uppercase tracking-widest">
            <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            SEND LINE MESSAGE
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function ContactMethod({ icon: Icon, label, value, href }: any) {
  return (
    <a href={href} className="flex items-center space-x-5 group">
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600/10 group-hover:border-red-600/30 transition-all">
        <Icon className="w-6 h-6 text-slate-400 group-hover:text-red-500" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
        <p className="text-white font-medium group-hover:text-red-500 transition-colors">{value}</p>
      </div>
    </a>
  );
}
