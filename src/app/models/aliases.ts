import { CompendiumEntity } from './shared/compendium';
import { BaseAppearance } from './shared/appearance';
import { GunRankingBlock } from './shared/gun-ranking';
import { SynergyStat } from './shared/synergy';

// 🧩 Compendium aliases
export type GunCompendium = CompendiumEntity;
export type EnemyCompendium = CompendiumEntity;
export type GungeoneerCompendium = CompendiumEntity;

// 🎯 Appearance aliases (BaseAppearance)
export type GunAppearance = BaseAppearance;
export type DropAppearance = BaseAppearance;
export type ItemAppearance = BaseAppearance;
// export type EnemyAppearance = BaseAppearance;

// 🔫 Gun Ranking aliases
export type RankingGunDrop = GunRankingBlock;
export type RankingGunItem = GunRankingBlock;
export type GunRankingSet = GunRankingBlock;

// 🧪 Synergy aliases
// export type ItemSynergy = SynergyStat;
// export type DropSynergy = SynergyStat;
// export type RecommendedItemStat = SynergyStat;