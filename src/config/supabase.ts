import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://oqirqyxbqgyamqgphirh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xaXJxeXhicWd5YW1xZ3BoaXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0Njc2NzQsImV4cCI6MjA4NjA0MzY3NH0.wrUr57XwOBB1-vfxpybh8r5l39RTUr67J9o2Upoe-HM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});