// export interface ItemSynergy {
//   label: string;  
//   value: string;  
// }

// export interface RecommendedItemEffect {
//   id: number;
//   name: string;        
//   stats: ItemSynergy[]; 
// }
import { SynergyStat } from '../models/shared/synergy';

export interface RecommendedItemEffect {
  id: number;
  name: string;
  stats: SynergyStat[];
}