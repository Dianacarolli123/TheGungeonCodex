import { Stat } from '../models/shared/stat';

export interface StrategicBalanceEntry {
  id: number;
  name: string;
  stats: Stat[];
}