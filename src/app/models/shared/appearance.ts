export interface AppearanceStat {
  label: string;
  value: number;
}

export interface BaseAppearance {
  id: number;
  name: string;
  statsChests: AppearanceStat[];
  statsPlaces: AppearanceStat[];
}