export function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function getVideoThumbnail(videoUrl: string, platform: 'youtube' | 'tiktok' | 'facebook' | string, manualThumbnail?: string) {
  if (manualThumbnail && manualThumbnail.startsWith('http')) return manualThumbnail;

  if (platform === 'youtube' || videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    const id = getYouTubeId(videoUrl);
    if (id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }

  if (platform === 'tiktok' || videoUrl.includes('tiktok.com')) {
    // TikTok thumbnail is hard to get without API, return a generic high-quality placeholder or the video URL itself (unlikely to work)
    // For now, use a nice blurred video placeholder design-wise if no thumbnail is provided
    return `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop`;
  }

  if (platform === 'facebook' || videoUrl.includes('facebook.com')) {
    return 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop';
  }

  return manualThumbnail || 'https://images.unsplash.com/photo-1598899139109-5c97034898f1?q=80&w=1000&auto=format&fit=crop';
}
