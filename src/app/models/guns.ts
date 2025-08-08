// export interface GunStat {
//   label: string;
//   value?: string | number;
// }

// export interface Gun {
//   id: number;
//   name: string;
//   description: string;
//   descriptionOverview: string;
//   srcImg: string;
//   stats: GunStat[];
//   statsOverview?: { label: string }[]; 
// }
import { Stat, SimpleStat } from '../models/shared/stat';

export interface Gun {
  id: number;
  name: string;
  description: string;
  descriptionOverview: string;
  srcImg: string;
  stats: Stat[];
  statsOverview?: SimpleStat[];
}