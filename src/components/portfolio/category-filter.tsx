'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category;
  onSelect: (category: Category) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className="relative px-4 py-1.5 text-sm font-medium transition-colors last:mr-4 whitespace-nowrap"
          >
            {/* Background pill */}
            <div
              className={cn(
                "absolute inset-0 rounded-lg transition-colors border border-white/10",
                isSelected 
                  ? "bg-white text-slate-900 border-white" 
                  : "bg-slate-800 text-slate-100 hover:bg-slate-700"
              )}
            />
            
            {/* Text */}
            <span className={cn(
              "relative z-10",
              isSelected ? "text-slate-900 font-bold" : "text-slate-100"
            )}>
              {category === 'Horizontal' ? 'Horizontal (16:9)' : 
               category === 'Vertical' ? 'Vertical (9:16)' : category}
            </span>

            {/* Framer Motion Indicator (Optional but nice) */}
            {isSelected && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-white rounded-lg -z-0"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
