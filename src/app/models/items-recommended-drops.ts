// export interface DropSynergy {
//   label: string;  
//   value: string;  
// }

// export interface RecommendedDropEffect {
//   id: number;
//   name: string;         
//   stats: DropSynergy[]; 
// }
import { SynergyStat } from '../models/shared/synergy';

export interface RecommendedDropEffect {
  id: number;
  name: string;
  stats: SynergyStat[];
}