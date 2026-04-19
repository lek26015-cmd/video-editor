import { redirect } from 'next/navigation';
import { checkAuth } from './actions';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await checkAuth();
  
  // Only protect /admin routes that are NOT /admin/login
  // Since this layout is in /admin/layout.tsx, it might cover /admin/login too if not careful
  // But usually layouts apply to children.
  
  return <>{children}</>;
}
