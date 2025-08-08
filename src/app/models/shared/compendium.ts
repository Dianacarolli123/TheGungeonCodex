import { Stat } from './stat';

export interface CompendiumTag {
  label: string;
}

export interface CompendiumEntity {
  id: number;
  name: string;
  lore: string;
  statsDescription: CompendiumTag[];
  stats: Stat[];
  srcImgbg: string;
}