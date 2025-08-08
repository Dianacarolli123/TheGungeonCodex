// export interface RecommendedItemStat {
//   label: string; 
//   value: string; 
// }

// export interface RecommendedItem {
//   id: number;
//   name: string; 
//   stats: RecommendedItemStat[];
// }
import { SynergyStat } from '../models/shared/synergy';

export interface RecommendedItem {
  id: number;
  name: string;
  stats: SynergyStat[];
}