import { supabase } from '../../config/supabase';

export const authService = {
  login: async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) throw error;
    return data.user;
  },

  signUp: async (email: string, pass: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: { data: { full_name: name } },
    });
    if (error) throw error;
    return data.user;
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getSession: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }
};