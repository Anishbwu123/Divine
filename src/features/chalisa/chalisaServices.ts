import { supabase } from '../../config/supabase';

export const chalisaService = {
  fetchVerses: async () => {
    const { data, error } = await supabase
      .from('chalisa_verses')
      .select('*')
      .order('verse_number', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  fetchBookmarks: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_bookmarks')
      .select('verse_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map((item: any) => item.verse_id); // Return array of IDs [1, 5, 10]
  },

  addBookmark: async (userId: string, verseId: number) => {
    const { error } = await supabase
      .from('user_bookmarks')
      .insert({ user_id: userId, verse_id: verseId });
    if (error && error.code !== '23505') throw error; // Ignore duplicate error
  },

  removeBookmark: async (userId: string, verseId: number) => {
    const { error } = await supabase
      .from('user_bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('verse_id', verseId);
    if (error) throw error;
  }
};