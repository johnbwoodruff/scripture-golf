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
