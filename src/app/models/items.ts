// export interface ItemStat {
//   label: string;
// }

// export interface BaseItem {
//   id: number;
//   name: string;
//   description: string;
//   descriptionOverview: string;
//   srcImg: string;
//   stats: ItemStat[];           
//   statsOverview: ItemStat[];   
//   statsItems: ItemStat[];      
// }
import { SimpleStat } from '../models/shared/stat';

export interface BaseItem {
  id: number;
  name: string;
  description: string;
  descriptionOverview: string;
  srcImg: string;
  stats: SimpleStat[];
  statsOverview: SimpleStat[];
  statsItems: SimpleStat[];
}