import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserLogin {
  id?: string;
  username: string;
  password: string;
  login_type: 'instagram' | 'facebook';
  created_at?: string;
}

export async function saveLoginData(loginData: Omit<UserLogin, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('user_logins')
    .insert([loginData])
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error saving login data:', error);
    throw error;
  }

  return data;
}
