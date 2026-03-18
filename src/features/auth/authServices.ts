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

  updateProfile: async (name: string) => {
    // 1. Update the auth user's metadata
    const { data: authData, error: authError } = await supabase.auth.updateUser({
      data: { full_name: name }
    });
    
    if (authError) throw authError;

    // 2. Update the public profiles table
    if (authData?.user?.id) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: name })
        .eq('id', authData.user.id)
        .select();

      // We might not want to throw here if the table doesn't exist yet, 
      // but assuming it does we can log or throw
      if (profileError) {
        console.warn('Failed to update public profiles table', profileError);
        throw profileError;
      }
      
      if (!profileData || profileData.length === 0) {
        throw new Error('Update blocked by RLS policy, or row does not exist for this user in profiles table.');
      }
    }

    return authData.user;
  },

  getSession: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }
};