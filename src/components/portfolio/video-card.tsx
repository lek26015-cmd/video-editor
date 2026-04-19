'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Music2, MoreVertical, CheckCircle2 } from 'lucide-react';
import { Youtube } from '@/components/ui/icons';
import { getVideoThumbnail } from '@/lib/video-utils';
import { cn } from '@/lib/utils';
import { VideoItem } from '@/lib/types';

interface VideoCardProps {
  video: VideoItem;
  onClick: (video: VideoItem) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const isVertical = video.orientation === 'vertical';
  const displayThumbnail = getVideoThumbnail(video.videoUrl, video.platform, video.thumbnailUrl);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col space-y-3 cursor-pointer"
      onClick={() => onClick(video)}
    >
      {/* Thumbnail/Embed Container */}
      <div 
        className={cn(
          "relative overflow-hidden rounded-xl bg-slate-800 shadow-lg transition-all duration-300 group-hover:shadow-red-500/10",
          isVertical ? "aspect-[9/16]" : "aspect-video"
        )}
      >
        <>
          {/* Thumbnail */}
          <Image
            src={displayThumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl">
              <Play className="w-6 h-6 fill-current" />
            </div>
          </div>
          {/* Platform Icon */}
          <div className="absolute top-2 right-2 p-1.5 rounded-md bg-black/60 backdrop-blur-md text-white">
            {video.platform === 'youtube' ? (
              <Youtube className="w-4 h-4 text-red-500" />
            ) : (
              <Music2 className="w-4 h-4 text-cyan-400" />
            )}
          </div>
          {/* Time Stamp (YouTube style) */}
          {!isVertical && (
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] font-medium text-white">
              12:45
            </div>
          )}
        </>
      </div>

      {/* Info Container */}
      <div className="flex space-x-3 px-1">
        {!isVertical && (
          <div className="flex-shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-700 relative">
              <Image 
                src={video.channelAvatar || 'https://i.pravatar.cc/100'} 
                alt="Avatar" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex-grow min-w-0">
          <h3 className={cn(
            "font-semibold text-slate-100 leading-tight line-clamp-2 transition-colors duration-200 group-hover:text-red-500",
            isVertical ? "text-sm" : "text-base"
          )}>
            {video.title}
          </h3>
          <div className="flex flex-col mt-1 text-slate-400 text-sm">
            <span className="flex items-center hover:text-white transition-colors">
              {video.channelName}
              {!isVertical && <CheckCircle2 className="w-3 h-3 ml-1 fill-current" />}
            </span>
            <div className="flex items-center space-x-1.5 mt-0.5 text-xs text-slate-500">
              <span>{video.views} views</span>
              <span>•</span>
              <span>{video.publishedAt}</span>
            </div>
          </div>
        </div>
        {!isVertical && (
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-5 h-5 text-slate-400" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
