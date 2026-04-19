export interface VideoItem {
  id: string;
  title: string;
  platform: 'youtube' | 'tiktok';
  orientation: 'horizontal' | 'vertical';
  videoUrl: string;
  thumbnailUrl: string;
  views?: string;
  publishedAt?: string;
  channelName?: string;
  channelAvatar?: string;
}

export type Category = 'All' | 'Horizontal' | 'Vertical';
