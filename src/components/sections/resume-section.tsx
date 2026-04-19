'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, GraduationCap, Award, CheckCircle2, ArrowRight, Sparkles, Download, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVisibleItems, getSiteConfig } from '@/lib/supabase';

export function ResumeSection() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({
    resume_intro: 'ความเชี่ยวชาญกว่าทศวรรษในการเปลี่ยนฟุตเทจให้เป็นเรื่องราวที่ทรงพลัง พร้อมยกระดับมาตราฐานงานหลังการผลิตให้กับองค์กร',
    education_year: '2012 - 2016',
    education_title: 'ศิลปศาสตรบัณฑิต',
    education_university: 'สาขาภาพยนตร์และสื่อดิจิทัล - มหาวิทยาลัยศิลปะชั้นนำ'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [expData, skillsData, siteConfig] = await Promise.all([
        getVisibleItems('experience'),
        getVisibleItems('skills'),
        getSiteConfig()
      ]);
      setExperiences(expData || []);
      setSkills(skillsData || []);
      if (siteConfig && Object.keys(siteConfig).length > 0) {
        setConfig((prev: any) => ({ ...prev, ...siteConfig }));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section id="resume" className="px-4 md:px-12 py-24 max-w-7xl mx-auto border-b border-white/5 scroll-mt-14">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            <span>พร้อมพิสูจน์ฝีมือร่วมกับทีมโปรดักชัน</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight uppercase">SKILLS & <span className="text-red-600">RESUME</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl">{config.resume_intro}</p>
          

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column: Education & Awards */}
        <div className="lg:col-span-1 space-y-16">
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-white flex items-center uppercase tracking-wider">
              <GraduationCap className="w-6 h-6 mr-3 text-red-600" />
              EDUCATION
            </h3>
            <div className="space-y-8 border-l-2 border-white/5 pl-6 ml-3">
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-red-600" />
                <p className="text-red-500 font-bold text-sm mb-1">{config.education_year}</p>
                <h4 className="text-xl font-bold text-white">{config.education_title}</h4>
                <p className="text-slate-400">{config.education_university}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Experience Summary & Skills */}
        <div className="lg:col-span-2 space-y-16">
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-white flex items-center uppercase tracking-wider">
              <Briefcase className="w-6 h-6 mr-3 text-red-600" />
              WORK EXPERIENCE
            </h3>
            <div className="grid grid-cols-1 gap-8">
              {experiences.map((exp, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div className="space-y-2">
                      <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-red-500 transition-colors">{exp.title}</h4>
                      <div className="flex flex-wrap items-center gap-y-2 text-red-500 font-bold text-lg">
                        <span>{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="mx-3 text-white/20 hidden md:inline">|</span>
                            <span className="text-slate-400 font-medium text-sm flex items-center">
                              <span className="w-4 h-4 mr-1 opacity-60">📍</span> {exp.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10 text-slate-400 text-sm font-bold flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-red-600" />
                      {exp.date_range}
                    </div>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed text-lg mb-8">{exp.description}</p>
                  
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="space-y-4">
                      <h5 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                        <Award className="w-4 h-4 mr-2 text-red-600" />
                        ความสำเร็จที่สำคัญ
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exp.highlights.map((highlight: string, idx: number) => (
                          <div key={idx} className="flex items-start p-4 rounded-2xl bg-black/30 border border-white/5 text-slate-300 text-sm leading-relaxed group/item hover:border-red-600/30 transition-all">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 mr-3 shrink-0" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {experiences.length === 0 && (
                <p className="text-slate-500 italic">ยังไม่มีข้อมูลประสบการณ์ทำงานในขณะนี้</p>
              )}
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-white flex items-center uppercase tracking-wider">
              <CheckCircle2 className="w-6 h-6 mr-3 text-red-600" />
              TECHNICAL SKILLS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-300 font-medium hover:bg-white/10 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-red-600 mr-3" />
                  {skill.name}
                </div>
              ))}
              {skills.length === 0 && (
                <p className="text-slate-500 italic">ยังไม่มีข้อมูลทักษะเชี่ยวชาญในขณะนี้</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
