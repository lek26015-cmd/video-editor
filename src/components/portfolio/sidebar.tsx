'use client';

import React from 'react';
import { 
  Home, 
  PlayCircle, 
  History, 
  Clock, 
  ThumbsUp, 
  ChevronRight,
  UserCircle,
  Settings,
  Flag,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

const SidebarItem = ({ icon: Icon, label, isActive = false, isCollapsed = false }: any) => (
  <button className={cn(
    "flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 group",
    isActive ? "bg-white/10 text-white font-semibold" : "text-slate-300 hover:bg-white/5 hover:text-white",
    isCollapsed ? "flex-col space-y-1 justify-center px-1" : "space-x-4"
  )}>
    <Icon className={cn(
      "transition-transform duration-200 group-hover:scale-110",
      isActive ? "w-6 h-6 text-red-500 fill-current" : "w-6 h-6",
      isCollapsed && "w-5 h-5"
    )} />
    <span className={cn(
      "truncate transition-all duration-200",
      isCollapsed ? "text-[10px]" : "text-sm"
    )}>
      {label}
    </span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside className={cn(
      "fixed top-14 bottom-0 left-0 bg-[#0f0f0f] z-40 transition-all duration-300 overflow-y-auto scrollbar-hide",
      isOpen ? "w-60 px-3" : "w-20 px-1"
    )}>
      <div className="py-2 space-y-1">
        <SidebarItem icon={Home} label="Home" isActive isCollapsed={!isOpen} />
        <SidebarItem icon={PlayCircle} label="Shorts" isCollapsed={!isOpen} />
        <SidebarItem icon={Clock} label="History" isCollapsed={!isOpen} />
      </div>

      {isOpen && (
        <>
          <div className="my-3 border-t border-white/10" />
          <div className="px-3 py-2">
            <h3 className="text-white font-bold text-base flex items-center mb-1">
              You <ChevronRight className="w-4 h-4 ml-1" />
            </h3>
          </div>
          <div className="space-y-1">
            <SidebarItem icon={UserCircle} label="Your channel" />
            <SidebarItem icon={History} label="History" />
            <SidebarItem icon={Clock} label="Watch later" />
            <SidebarItem icon={ThumbsUp} label="Liked videos" />
          </div>

          <div className="my-3 border-t border-white/10" />
          <div className="px-3 py-2">
            <h3 className="text-white font-semibold text-sm mb-2 px-1">Settings</h3>
            <div className="space-y-1">
              <SidebarItem icon={Settings} label="Settings" />
              <SidebarItem icon={Flag} label="Report history" />
              <SidebarItem icon={HelpCircle} label="Help" />
              <SidebarItem icon={MessageSquare} label="Send feedback" />
            </div>
          </div>
        </>
      )}

      {!isOpen && (
        <div className="py-2 space-y-4">
          <SidebarItem icon={PlayCircle} label="Shorts" isCollapsed />
          <SidebarItem icon={Clock} label="Library" isCollapsed />
        </div>
      )}
    </aside>
  );
};
