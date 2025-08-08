export interface FloorAppearance {
  label: string;
  value: number;
}

export interface EnemyAppearance {
  id: number;
  name: string;
  statsNormal: FloorAppearance[];
  statsSpecial: FloorAppearance[];
}