'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { getVisibleItems } from '@/lib/supabase';

const INITIAL_TESTIMONIALS = [
  {
    name: "คุณจินดาณี เลิศประภา",
    role: "ผู้อำนวยการฝ่ายการตลาด, TechFlow",
    content: "ดีที่สุดตั้งแต่เราเคยร่วมงานมา เซนส์เรื่องจังหวะและการตัดต่อยอดเยี่ยมมากจริงๆ ครับ",
    rating: 5,
    avatar_url: "https://i.pravatar.cc/150?u=jinda"
  },
  {
    name: "คุณอรรถพล มั่นคง",
    role: "โปรดิวเซอร์อิสระ, Vibe Agency",
    content: "ปกติความเร็วและคุณภาพมักจะมาไม่พร้อมกัน แต่ที่นี่ทำให้เราทึ่งได้จริงๆ งานเนี๊ยบมาก",
    rating: 5,
    avatar_url: "https://i.pravatar.cc/150?u=atta"
  }
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getVisibleItems('testimonials');
      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(INITIAL_TESTIMONIALS);
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
      <div className="space-y-6 mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>เสียงตอบรับจากลูกค้า</span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">ความประทับใจ <span className="text-red-600">จากลูกค้า</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">ความไว้วางใจเกิดจากคุณภาพงานที่สม่ำเสมอ ฟังความรู้สึกจากแบรนด์และครีเอเตอร์ที่เคยร่วมงานกับเรา</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 relative group hover:bg-white/[0.08] transition-all duration-500"
          >
            <Quote className="absolute top-8 right-10 w-12 h-12 text-red-600/10 group-hover:text-red-600/20 transition-colors" />
            
            <div className="flex items-center space-x-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-red-500 fill-current" />
              ))}
            </div>

            <p className="text-xl text-white italic leading-relaxed mb-10 relative z-10">
              "{testimonial.content}"
            </p>

            <div className="flex items-center space-x-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-red-600/20">
                <Image 
                  src={testimonial.avatar_url || "https://i.pravatar.cc/150?u=default"} 
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                <p className="text-slate-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
