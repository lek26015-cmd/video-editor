'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResumeRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/#resume');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
    </div>
  );
}
