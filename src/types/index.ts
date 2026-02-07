export interface UserProfile {
  id: string;
  email: string | undefined;
  full_name?: string;
}

export interface ChalisaVerse {
  id: number;
  verse_number: number;
  verse_type: 'doha' | 'chaupai';
  hindi_text: string;
  english_transliteration: string;
  english_translation: string;
}