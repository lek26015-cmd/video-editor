'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight,
  Mail,
  LayoutGrid,
  FileText,
  Award,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarItem = ({ icon: Icon, label, href = "#", isCollapsed = false, onClick, activeSection }: any) => {
  const pathname = usePathname();
  
  // Check if this item is active
  let isActive = false;
  if (href.startsWith('/#') || (href === '/' && pathname === '/')) {
    const sectionId = href === '/' ? 'home' : href.replace('/#', '');
    isActive = activeSection === sectionId;
  } else {
    isActive = pathname === href;
  }

  const handleManualScroll = (e: React.MouseEvent) => {
    if ((href.startsWith('/#') || href === '/') && pathname === '/') {
      e.preventDefault();
      const id = href === '/' ? 'home' : href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Account for navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        if (onClick) onClick();
      }
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Link 
      href={href} 
      className="block relative outline-none focus:outline-none" 
      onClick={handleManualScroll}
    >
      <button className={cn(
        "flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-300 group relative z-10 outline-none focus:outline-none",
        isActive ? "text-white font-bold" : "text-slate-400 hover:text-white",
        isCollapsed ? "flex-col space-y-1 justify-center px-1" : "space-x-4"
      )}>
        <Icon className={cn(
          "transition-all duration-300 group-hover:scale-110",
          isActive ? "w-6 h-6 text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" : "w-6 h-6",
          isCollapsed && "w-5 h-5"
        )} />
        <span className={cn(
          "truncate transition-all duration-300 tracking-wide",
          isCollapsed ? "text-[10px]" : "text-sm",
          isActive && "translate-x-1"
        )}>
          {label}
        </span>
      </button>

      {/* Shared Layout Active Indicator */}
      {isActive && (
        <motion.div
          layoutId="sidebarActivePill"
          className="absolute inset-0 bg-white/[0.08] border-l-2 border-red-600 rounded-r-xl z-0"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      )}
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['home', 'resume', 'portfolio'];
      // Trigger line should be a bit below the top to avoid flickering
      const scrollPosition = window.scrollY + 120; 

      let currentSection = 'home';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop) {
          currentSection = sectionId;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside className={cn(
        "fixed top-14 bottom-0 left-0 bg-[#0f0f0f] z-50 transition-all duration-300 overflow-y-auto scrollbar-hide border-r border-white/5 shadow-2xl md:shadow-none",
        "md:translate-x-0", // Always visible on desktop
        isOpen ? "translate-x-0 w-60 px-3" : "-translate-x-full md:translate-x-0 w-60 md:w-20 px-1"
      )}>
        <div className="py-2 space-y-1">
          <SidebarItem icon={Home} label="HOME" href="/" isCollapsed={!isOpen} activeSection={activeSection} onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) onClose(); }} />
          <SidebarItem icon={FileText} label="RESUME" href="/#resume" isCollapsed={!isOpen} activeSection={activeSection} onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) onClose(); }} />
          <SidebarItem icon={LayoutGrid} label="PORTFOLIO" href="/#portfolio" isCollapsed={!isOpen} activeSection={activeSection} onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) onClose(); }} />
        </div>

        <div className={cn("transition-opacity", !isOpen && "md:opacity-100")}>
          <div className="my-3 border-t border-white/10" />
          <div className={cn("px-3 py-2", !isOpen && "md:hidden")}>
            <h3 className="text-white font-bold text-xs flex items-center mb-1 uppercase tracking-widest text-slate-500">
              CAREER PROFILE <ChevronRight className="w-4 h-4 ml-1" />
            </h3>
          </div>
          <div className="space-y-1">
            <SidebarItem icon={Briefcase} label="EXPERIENCE" href="/experience" isCollapsed={!isOpen} activeSection={activeSection} onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) onClose(); }} />
          </div>

          <div className="my-3 border-t border-white/10" />
          <div className={cn("px-3 py-2", !isOpen && "md:hidden")}>
            <h3 className="text-white font-semibold text-xs mb-2 px-1 text-slate-500 uppercase tracking-widest">CONNECT</h3>
          </div>
          <div className="space-y-1">
            <SidebarItem icon={Mail} label="HIRE ME" href="/hire-me" isCollapsed={!isOpen} activeSection={activeSection} onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) onClose(); }} />
          </div>
        </div>
      </aside>
    </>
  );
};
