'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/portfolio/navbar';
import { Sidebar } from '@/components/portfolio/sidebar';
import { cn } from '@/lib/utils';

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-grow pt-14">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className={cn(
          "flex-grow transition-all duration-300 min-h-[calc(100vh-3.5rem)]",
          isSidebarOpen ? "md:ml-60 ml-0" : "md:ml-20 ml-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
