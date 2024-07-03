export type VolumeKey = 'BOM' | 'DC' | 'PGP' | 'OT' | 'NT';

export interface Scripture {
  volume: VolumeKey;
  book: string;
  chapter: number;
  verse: string;
}

export interface ScriptureBook {
  key: VolumeKey;
  title: string;
}

/**
 * This is a type for the full scripture text from the LDS
 * Documentation Project. Eventually I'll unify the types
 * but for now I have both scripture types and will convert
 * between them as needed.
 */
export interface AdvancedScripture {
  volume_title: string;
  book_title: string;
  book_short_title: string;
  chapter_number: number;
  verse_number: number;
  verse_title: string;
  verse_short_title: string;
  scripture_text: string;
}
