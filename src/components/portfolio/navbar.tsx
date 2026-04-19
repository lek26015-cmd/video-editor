'use client';

import React from 'react';
import { Menu, Search, Mic, Video, Bell, User } from 'lucide-react';
import { Youtube } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavbarProps {
  onMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] flex items-center justify-between px-4 z-50">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuToggle}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        <Link href="/" className="flex items-center space-x-1 cursor-pointer">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Youtube className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-white font-bold text-xl tracking-tighter uppercase">PORTFOLIO</span>
        </Link>
      </div>

      {/* Middle - Search */}
      <div className="hidden md:flex flex-grow max-w-[720px] items-center space-x-4">
        <div className="flex flex-grow items-center">
          <div className="flex flex-grow items-center bg-[#121212] border border-[#303030] rounded-l-full px-4 focus-within:border-blue-500 transition-colors">
            <Search className="w-5 h-5 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search videos..."
              className="w-full bg-transparent py-2 text-white outline-none placeholder:text-slate-500 focus:placeholder:text-slate-400"
            />
          </div>
          <button className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 py-2.5 hover:bg-[#2a2a2a] transition-colors border-l-white/10">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
        <button className="p-2.5 bg-[#181818] rounded-full hover:bg-white/10 transition-colors">
          <Mic className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="p-2 hover:bg-white/10 rounded-full md:block hidden">
          <Video className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full md:block hidden">
          <Bell className="w-6 h-6 text-white" />
        </button>
        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-red-700 transition-colors">
          T
        </div>
      </div>
    </nav>
  );
};
