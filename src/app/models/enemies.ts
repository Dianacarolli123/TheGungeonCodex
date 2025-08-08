// export interface EnemyStat {
//   label: string;
// }

// export interface EnemyGun {
//   label: string;
// }

// export interface Enemy {
//   id: number;
//   name: string;
//   description: string;
//   descriptionOverview: string;
//   srcImg: string;
//   stats: EnemyStat[];
//   statsGuns: EnemyGun[];
// }
import { SimpleStat } from '../models/shared/stat';

export interface Enemy {
  id: number;
  name: string;
  description: string;
  descriptionOverview: string;
  srcImg: string;
  stats: SimpleStat[];
  statsGuns: SimpleStat[];
}