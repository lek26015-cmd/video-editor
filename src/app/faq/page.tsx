'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronDown, Sparkles, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVisibleItems } from '@/lib/supabase';

const INITIAL_FAQS = [
  {
    question: "มีรูปแบบการทำงานในทีมโปรดักชันอย่างไร?",
    answer: "ฉันมีทักษะการทำงานร่วมกับทีมอย่างมีระบบ ทั้งการรับบรีฟจาก Producer การแก้ไขงานตาม Feedback และการจัดการส่งมอบงานตาม Deadline ที่กำหนดอย่างเคร่งครัด"
  },
  {
    question: "ซอฟต์แวร์และเครื่องมือที่ถนัดที่สุดคืออะไร?",
    answer: "เชี่ยวชาญ DaVinci Resolve Studio ในระดับสูงทั้งด้านการตัดต่อและเกรดสี รวมถึงมีความเข้าใจในระบบ Color Management และ Proxy Workflow สำหรับโปรเจกต์ขนาดใหญ่"
  },
  {
    question: "พร้อมสำหรับการเริ่มงานใหม่เมื่อไหร่?",
    answer: "ฉันพร้อมเริ่มงานใหม่หรือรับโปรเจกต์ในฐานะพนักงานสัญญาจ้างได้ทันที โดยเปิดรับทั้งการทำงานที่ออฟฟิศ (On-site) และการทำงานทางไกล (Remote)"
  },
  {
    question: "มีแนวทางการจัดการไฟล์งานและ Asset อย่างไร?",
    answer: "ฉันใช้ระบบ Folder Structure ที่เป็นมาตรฐานสากล เพื่อให้สมาชิกในทีมท่านอื่นสามารถดึงไฟล์ไปทำงานต่อได้ทันที (Collaborative Pipeline)"
  }
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getVisibleItems('faqs');
      if (data && data.length > 0) {
        setFaqs(data);
      } else {
        setFaqs(INITIAL_FAQS);
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
    <div className="px-4 md:px-12 pt-12 pb-24 max-w-4xl mx-auto">
      <div className="space-y-6 mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>ข้อมูลเพื่อทำความรู้จักตัวตนและระบบงาน</span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Q&A สำหรับ <span className="text-red-600">การร่วมงาน</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">คำถามและคำตอบที่ช่วยให้ฝ่ายบุคคลและทีมโปรดักชันเข้าใจสไตล์การทำงานและศักยภาพเบื้องต้นของฉัน</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-20 p-8 rounded-3xl bg-red-600/5 border border-red-500/20 text-center"
      >
        <UserCheck className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">ต้องการนัดสัมภาษณ์หรือพูดคุยเพิ่มเติม?</h2>
        <p className="text-slate-400 mb-6">ฉันพร้อมเสมอที่จะตอบข้อสงสัยหรือร่วมทดสอบทักษะ (Editor Test) กับทางทีมของคุณ</p>
        <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all">
          ตารางเวลานัดหมาย / นัดสัมภาษณ์
        </button>
      </motion.div>
    </div>
  );
}

function FAQItem({ faq, index }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "rounded-3xl border transition-all duration-300 overflow-hidden",
        isOpen ? "bg-white/10 border-red-500/30 shadow-xl" : "bg-white/5 border-white/10"
      )}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left group"
      >
        <span className={cn(
          "text-lg font-bold transition-colors",
          isOpen ? "text-red-500" : "text-white group-hover:text-red-400"
        )}>
          {faq.question}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-transform duration-300",
          isOpen && "rotate-180 bg-red-600 text-white"
        )}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-8 pb-8 text-slate-400 leading-relaxed text-lg">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
