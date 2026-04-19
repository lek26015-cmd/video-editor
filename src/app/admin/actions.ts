'use server';

import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

// Simple master password check
export async function login(password: string) {
  const masterPassword = process.env.ADMIN_PASSWORD;

  if (password === masterPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 1 day
    });
    return { success: true };
  }

  return { success: false };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

export async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session?.value === 'authenticated';
}

// Database Actions
export async function updateVisibility(table: string, id: string, isVisible: boolean) {
  const isAuth = await checkAuth();
  if (!isAuth) throw new Error('Unauthorized');
  if (!supabase) throw new Error('Supabase not connected');

  const { error } = await supabase
    .from(table)
    .update({ is_visible: isVisible })
    .eq('id', id);

  if (error) throw new Error(error.message);
  return { success: true };
}

export async function deleteItem(table: string, id: string) {
  const isAuth = await checkAuth();
  if (!isAuth) throw new Error('Unauthorized');
  if (!supabase) throw new Error('Supabase not connected');

  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return { success: true };
}

export async function upsertItem(table: string, item: any) {
  const isAuth = await checkAuth();
  if (!isAuth) throw new Error('Unauthorized');
  if (!supabase) throw new Error('Supabase not connected');

  const { error } = await supabase
    .from(table)
    .upsert(item);

  if (error) throw new Error(error.message);
  return { success: true };
}
