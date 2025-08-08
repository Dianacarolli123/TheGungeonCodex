import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import dropsData from '../../../../assets/drops.json';
import gunsData from '../../../../assets/guns.json';
import rankingGunsDropsData from '../../../../assets/ranking-guns-drops.json';

import { Drop } from '../../../models/drops';
import { Gun } from '../../../models/guns';
import { RankingGunDrop } from '../../../models/aliases';

import { Title } from '../../../shared/title/title';
import { InitialOverview } from '../../../shared/initial-overview/initial-overview';
import { RecommendedItems } from '../../../shared/recommended-items/recommended-items';
import { RankingGuns } from '../../../shared/ranking-guns/ranking-guns';
import dropAppearanceData from '../../../../assets/drops-appearance.json';
import { DropAppearance } from '../../../models/aliases';
import { RankingGungeoneers } from '../../../shared/metric-dualbar-list/metric-dualbar-list';

@Component({
  selector: 'app-drops-detail',
  standalone: true,
  imports: [
    CommonModule,
    Title,
    InitialOverview,
    RecommendedItems,
    RankingGuns,
    RankingGungeoneers,
  ],
  templateUrl: './drops-detail.html',
  styleUrl: './drops-detail.css',
})
export class DropsDetail implements OnInit {
  drop!: Drop;
  highlightedStats: { label: string }[] = [];
  gunRankingList: Gun[] = [];
  dropAppearance!: DropAppearance;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const nameParam = this.slugify(
      this.route.snapshot.paramMap.get('name') || ''
    );
    this.drop = dropsData.find((d) => this.slugify(d.name) === nameParam)!;
    this.highlightedStats = this.drop.stats.slice(3);

    const appearanceEntry = dropAppearanceData.find(
      (entry: DropAppearance) => this.slugify(entry.name) === nameParam
    );
    if (appearanceEntry) {
      this.dropAppearance = appearanceEntry;
    }
    const rankingEntry = rankingGunsDropsData.find(
      (entry: RankingGunDrop) => this.slugify(entry.name) === nameParam
    );

    if (rankingEntry) {
      this.gunRankingList = rankingEntry.guns
        .map((gunRef) => {
          const baseGun = gunsData.find(
            (g) => this.slugify(g.name) === this.slugify(gunRef.label)
          );
          if (!baseGun) return null;

          const gunCopy: Gun = JSON.parse(JSON.stringify(baseGun));

          // 🛠 Tipado seguro con índice dinámico
          const overrides = gunRef.overrides as { [key: string]: number };
          gunCopy.stats = gunCopy.stats.map((stat) => {
            const overrideValue = overrides?.[stat.label];
            if (
              overrideValue !== undefined &&
              stat.value !== undefined &&
              overrideValue !== stat.value
            ) {
              stat.value = `${stat.value} → ${overrideValue}`;
            }
            return stat;
          });

          return gunCopy;
        })
        .filter((g): g is Gun => g !== null);
    }
  }

  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }
}
