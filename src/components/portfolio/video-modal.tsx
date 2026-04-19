'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { VideoItem } from '@/lib/types';
import { cn } from '@/lib/utils';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (video) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
  }, [video]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          key="video-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.button
            key="close-button"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110]"
            onClick={onClose}
          >
            <X className="w-8 h-8" />
          </motion.button>

          <motion.div
            key="video-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10",
              video.orientation === 'vertical' ? "max-w-[450px] aspect-[9/16]" : "max-w-6xl aspect-video"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {video.platform === 'youtube' ? (
              <iframe
                src={`${video.videoUrl}?autoplay=1&rel=0`}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <iframe
                src={`https://www.tiktok.com/embed/v2/${(video.videoUrl || '').split('/').pop()}`}
                title={video.title}
                className="w-full h-full border-0"
                allowFullScreen
              />
            )}
            
            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <h2 className="text-xl font-bold text-white mb-1">{video.title}</h2>
              <p className="text-sm text-slate-300">{video.channelName} • {video.views} views</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
