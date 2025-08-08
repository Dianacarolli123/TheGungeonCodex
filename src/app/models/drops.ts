// export interface DropStat {
//   label: string;
// }

// export interface Drop {
//   id: number;
//   name: string;
//   description: string;
//   descriptionOverview: string;
//   srcImg: string;
//   stats: DropStat[];           
//   statsOverview: DropStat[];   
// }
import { SimpleStat } from '../models/shared/stat';

export interface Drop {
  id: number;
  name: string;
  description: string;
  descriptionOverview: string;
  srcImg: string;
  stats: SimpleStat[];
  statsOverview: SimpleStat[];
}