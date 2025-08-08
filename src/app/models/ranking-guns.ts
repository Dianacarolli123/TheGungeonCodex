// export interface GunStatOverride {
//   [statLabel: string]: string | number | undefined;
// }

// export interface GunReference {
//   label: string;
//   overrides?: GunStatOverride;
// }

// export interface GunRankingEntry {
//   id: number;
//   name: string;
//   guns: GunReference[];
// }
import { GunReference } from '../models/shared/gun-ranking';

export interface GunRankingEntry {
  id: number;
  name: string;
  guns: GunReference[];
}
