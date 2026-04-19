'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Settings, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { login } from '../actions';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await login(password);
      if (response.success) {
        router.push('/admin');
      } else {
        setError('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดบางอย่าง');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-[#111111] rounded-[2.5rem] border border-white/10 p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-3xl" />
          
          <div className="flex flex-col items-center text-center space-y-6 mb-10">
            <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">เข้าสู่ระบบหลังบ้าน</h1>
              <p className="text-slate-400">กรุณาใส่รหัสผ่านเพื่อจัดการข้อมูลพอร์ตโฟลิโอ</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Master Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/10 text-white focus:border-red-500/50 outline-none transition-all text-center tracking-[0.5em] text-xl"
                autoFocus
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm font-bold text-center"
              >
                {error}
              </motion.p>
            )}

            <button 
              disabled={loading}
              className="w-full py-5 bg-red-600 hover:bg-red-700 disabled:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-xl shadow-red-600/20 active:scale-[0.98] flex items-center justify-center group"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  ยืนยันรหัสผ่าน <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm">
              <Settings className="w-4 h-4 inline mr-2 opacity-50" />
              เฉพาะเจ้าของพอร์ตโฟลิโอเท่านั้น
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
