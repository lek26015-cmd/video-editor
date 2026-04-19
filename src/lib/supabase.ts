import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Basic URL validation to prevent crashes from invalid placeholders
const isValidUrl = (url: any) => {
  try {
    if (typeof url !== 'string') return false;
    return url.startsWith('http') && !!new URL(url);
  } catch {
    return false;
  }
};

// Only initialize if credentials are valid to avoid "Invalid supabaseUrl" crash
export const supabase = (supabaseUrl && isValidUrl(supabaseUrl) && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!supabase) {
  if (typeof window !== 'undefined') {
    console.warn('Supabase credentials missing. Project is running in local fallback mode.');
  }
}

export async function getVisibleItems(table: string) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error(`Error fetching ${table}:`, {
      message: error.message,
      code: error.code,
      hint: error.hint
    });
    return [];
  }
  return data;
}

export async function getSiteConfig() {
  if (!supabase) return {};

  const { data, error } = await supabase
    .from('site_config')
    .select('*');
  
  if (error) {
    console.error('Error fetching site_config:', error);
    return {};
  }
  
  return (data || []).reduce((acc: any, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
}
