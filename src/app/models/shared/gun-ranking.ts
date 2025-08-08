export interface GunOverrides {
  [statName: string]: number | undefined;
}

export interface GunReference {
  label: string;
  overrides?: GunOverrides;
}

export interface GunRankingBlock {
  id: number;
  name: string;
  guns: GunReference[];
}