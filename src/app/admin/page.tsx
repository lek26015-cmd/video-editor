'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Video, 
  Briefcase, 
  Award, 
  Settings,
  Save,
  LogOut,
  X,
  PlusCircle,
  Wand2,
  Mail,
  Home as HomeIcon,
  Layout
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { updateVisibility, deleteItem, upsertItem, logout } from './actions';
import { cn } from '@/lib/utils';

type TableKey = 'projects' | 'experience' | 'skills' | 'site_config';

const TABLE_FIELDS: Record<string, string[]> = {
  projects: ['title', 'description', 'video_url', 'platform', 'orientation', 'category'],
  experience: ['title', 'company', 'location', 'date_range', 'description', 'highlights'],
  skills: ['name'],
  site_config: ['key', 'value']
};

const FIELD_LABELS: Record<string, string> = {
  title: 'หัวข้อ / ตำแหน่งงาน',
  company: 'ชื่อบริษัท / หน่วยงาน',
  location: 'สถานที่ (จังหวัด, ประเทศ)',
  date_range: 'ช่วงเวลา (เช่น 2021 - ปัจจุบัน)',
  description: 'รายละเอียด / คำอธิบาย',
  highlights: 'ความสำเร็จที่สำคัญ (รายการจุดไข่ปลา)',
  year: 'ปีที่ได้รับ',
  organization: 'สถาบัน / ผู้มอบรางวัล',
  name: 'ชื่อทักษะ / ชื่อรายการ',
  video_url: 'ลิงก์วิดีโอ (YouTube/Facebook/TikTok)',
  platform: 'แพลตฟอร์ม (youtube/vimeo)',
  orientation: 'แนวของวิดีโอ (horizontal/vertical)',
  category: 'หมวดหมู่ (เช่น โฆษณา, MV)',
  key: 'ชื่อค่าตั้งค่า (ห้ามเว้นวรรค)',
  value: 'ข้อมูล'
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TableKey>('projects');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data: result, error } = await supabase
      .from(activeTab)
      .select('*')
      .order(activeTab === 'site_config' ? 'key' : 'created_at', { ascending: activeTab === 'site_config' });
    
    if (error) console.error(error);
    else setData(result || []);
    setLoading(false);
  }

  async function handleToggleVisibility(id: string, current: boolean) {
    try {
      await updateVisibility(activeTab, id, !current);
      setData(data.map(item => item.id === id ? { ...item, is_visible: !current } : item));
    } catch (err) {
      alert('ไม่สามารถอัปเดตสถานะการแสดงผลได้');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) return;
    try {
      await deleteItem(activeTab, id);
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      alert('ไม่สามารถลบรายการได้');
    }
  }

  async function handleUpsert(e: React.FormEvent) {
    e.preventDefault();
    try {
      await upsertItem(activeTab, editingItem);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      alert('ไม่สามารถบันทึกข้อมูลได้');
    }
  }

  async function handleLogout() {
    await logout();
    window.location.href = '/admin/login';
  }

  const renderField = (key: string, value: any, onChange: (val: any) => void) => {
    if (key === 'id' || key === 'created_at') return null;
    if (key === 'is_visible') return null;
    
    const label = FIELD_LABELS[key] || key;
    
    if (key === 'highlights' || key === 'features') {
      const items = Array.isArray(value) ? value : [];
      return (
        <div key={key} className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-red-500/80">{label}</label>
          <div className="space-y-2">
            {items.map((item: string, idx: number) => (
              <div key={idx} className="flex gap-2">
                <input 
                  value={item} 
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx] = e.target.value;
                    onChange(newItems);
                  }}
                  className="flex-grow px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-red-500/50 outline-none"
                  placeholder={`รายการที่ ${idx + 1}`}
                />
                <button type="button" onClick={() => onChange(items.filter((_, i) => i !== idx))} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button 
              type="button"
              onClick={() => onChange([...items, ''])}
              className="flex items-center text-xs font-bold text-red-500 hover:text-red-400 transition-colors pt-1"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> เพิ่มรายการจุดไข่ปลา
            </button>
          </div>
        </div>
      );
    }

    if (key === 'platform') {
      return (
        <div key={key} className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</label>
          <select 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-red-500/50 outline-none appearance-none"
          >
            <option value="" disabled>เลือกแพลตฟอร์ม</option>
            <option value="youtube">YouTube</option>
            <option value="facebook">Facebook</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
      );
    }

    if (key === 'orientation') {
      return (
        <div key={key} className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</label>
          <select 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-red-500/50 outline-none appearance-none"
          >
            <option value="" disabled>เลือกแนวของวิดีโอ</option>
            <option value="horizontal">Horizontal (แนวนอน 16:9)</option>
            <option value="vertical">Vertical (แนวตั้ง 9:16)</option>
          </select>
        </div>
      );
    }

    return (
      <div key={key} className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</label>
        {key === 'description' || key === 'content' || key === 'answer' || key === 'value' ? (
          <textarea 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-red-500/50 outline-none resize-none"
            placeholder={`ระบุ${label.toLowerCase()}`}
          />
        ) : (
          <input 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-red-500/50 outline-none"
            readOnly={activeTab === 'site_config' && key === 'key' && editingItem?.id}
            placeholder={`ระบุ${label.toLowerCase()}`}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f0f0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">ระบบจัดการพอร์ตโฟลิโอ</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">ออกจากระบบ</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={Video} label="ผลงานวิดีโอ" />
            <TabButton active={activeTab === 'experience'} onClick={() => setActiveTab('experience')} icon={Briefcase} label="ประวัติงาน" />
            <TabButton active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} icon={Wand2} label="ทักษะเชี่ยวชาญ" />
            <TabButton active={activeTab === 'site_config'} onClick={() => setActiveTab('site_config')} icon={Settings} label="ตั้งค่าเว็บไซต์" />
          </nav>
        </aside>

        <main className="flex-grow">
          <div className="bg-[#111111] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
            <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-2xl font-bold capitalize">
                {activeTab === 'site_config' ? 'ตั้งค่าเนื้อหาเว็บไซต์' : activeTab.replace('_', ' ')}
              </h2>
              {activeTab !== 'site_config' && (
                <button 
                  onClick={() => {
                    const newItem = { is_visible: true };
                    TABLE_FIELDS[activeTab].forEach(field => (newItem as any)[field] = field === 'highlights' ? [] : '');
                    setEditingItem(newItem);
                  }}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  <span>เพิ่มใหม่</span>
                </button>
              )}
            </div>

            <div className="p-8 flex-grow">
              {loading ? (
                <div className="h-full flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {data.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                      <p className="text-slate-500 italic">ยังไม่มีข้อมูลในหมวดนี้ กรุณากด "เพิ่มใหม่" เพื่อเริ่มสร้างเนื้อหา</p>
                    </div>
                  ) : (
                    data.map((item) => (
                      <motion.div key={item.id || item.key} layout className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
                        <div className="flex items-center space-x-5">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                            {activeTab === 'projects' && <Video className="w-6 h-6" />}
                            {activeTab === 'experience' && <Briefcase className="w-6 h-6" />}
                            {activeTab === 'awards' && <Award className="w-6 h-6" />}
                            {activeTab === 'skills' && <Wand2 className="w-6 h-6" />}
                            {activeTab === 'site_config' && <Settings className="w-6 h-6" />}
                          </div>
                          <div className="max-w-[300px] md:max-w-md">
                            <h3 className="font-bold text-white text-lg truncate">
                              {item.title || item.name || item.key}
                            </h3>
                            <p className="text-sm text-slate-500 line-clamp-1 italic">
                              {item.company || item.organization || item.value}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {activeTab !== 'site_config' && (
                            <button onClick={() => handleToggleVisibility(item.id, item.is_visible)} className={cn("p-3 rounded-xl transition-all", item.is_visible ? "text-green-500 bg-green-500/10" : "text-slate-500 bg-white/5")}>
                              {item.is_visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                            </button>
                          )}
                          <button onClick={() => setEditingItem(item)} className="p-3 rounded-xl text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 transition-all">
                            <Settings className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDelete(item.id || item.key)} className="p-3 rounded-xl text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-all">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {editingItem && (
          <motion.div 
            key="editing-modal-overlay"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div onClick={() => setEditingItem(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div 
              key="editing-modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="relative w-full max-w-2xl bg-[#1a1a1a] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <form onSubmit={handleUpsert} className="p-10 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">จัดการข้อมูล {activeTab.replace('_', ' ')}</h3>
                  <button type="button" onClick={() => setEditingItem(null)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
                </div>
                
                <div className="space-y-8">
                  {TABLE_FIELDS[activeTab].map(field => 
                    renderField(field, editingItem[field], (val) => setEditingItem({ ...editingItem, [field]: val }))
                  )}
                </div>

                <div className="flex justify-end space-x-4 mt-12 bg-[#1a1a1a] sticky bottom-0 pt-6">
                  <button type="button" onClick={() => setEditingItem(null)} className="px-8 py-3 rounded-2xl hover:bg-white/5 text-white transition-all font-bold">ยกเลิก</button>
                  <button type="submit" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-red-600/20 flex items-center">
                    <Save className="w-5 h-5 mr-2" /> บันทึกการเปลี่ยนแปลง
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({ active, icon: Icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className={cn("flex items-center w-full px-4 py-3 rounded-2xl transition-all duration-200 group relative", active ? "bg-red-600 text-white shadow-lg shadow-red-600/20 font-bold" : "text-slate-400 hover:bg-white/5 hover:text-white font-medium")}>
      <Icon className={cn("w-5 h-5 mr-3 transition-transform duration-200", !active && "group-hover:scale-110")} />
      <span className="text-sm">{label}</span>
      {active && <motion.div layoutId="tab-active" className="absolute left-[-4px] top-1/4 bottom-1/4 w-1 bg-white rounded-full" />}
    </button>
  );
}
