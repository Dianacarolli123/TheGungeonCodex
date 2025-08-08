import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import itemsData from '../../../../assets/items.json';
import gunsData from '../../../../assets/guns.json';
import rankingGunsItemsData from '../../../../assets/ranking-guns-items.json';

import { BaseItem } from '../../../models/items';
import { Gun } from '../../../models/guns';
import { RankingGunItem } from '../../../models/aliases';

import { Title } from '../../../shared/title/title';
import { InitialOverview } from '../../../shared/initial-overview/initial-overview';
import { RecommendedItems } from '../../../shared/recommended-items/recommended-items';
import { RankingGuns } from '../../../shared/ranking-guns/ranking-guns';
import { RankingGungeoneers } from '../../../shared/metric-dualbar-list/metric-dualbar-list';
import itemAppearanceData from '../../../../assets/items-appearance.json';
import { ItemAppearance } from '../../../models/aliases';
@Component({
  selector: 'app-items-detail',
  standalone: true,
  imports: [
    CommonModule,
    Title,
    InitialOverview,
    RecommendedItems,
    RankingGuns,
    RankingGungeoneers,
  ],
  templateUrl: './items-detail.html',
  styleUrl: './items-detail.css',
})
export class ItemsDetail implements OnInit {
  item!: BaseItem;
  gunRankingList: Gun[] = [];
  itemAppearance!: ItemAppearance;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const nameParam = this.slugify(
      this.route.snapshot.paramMap.get('name') || ''
    );
    this.item = itemsData.find((i) => this.slugify(i.name) === nameParam)!;

    const rankingEntry = rankingGunsItemsData.find(
      (entry: RankingGunItem) => this.slugify(entry.name) === nameParam
    );
    const appearanceEntry = itemAppearanceData.find(
      (entry: ItemAppearance) => this.slugify(entry.name) === nameParam
    );

    if (appearanceEntry) {
      this.itemAppearance = appearanceEntry;
    }
    if (rankingEntry) {
      this.gunRankingList = rankingEntry.guns
        .map((gunRef) => {
          const baseGun = gunsData.find(
            (g) => this.slugify(g.name) === this.slugify(gunRef.label)
          );
          if (!baseGun) return null;

          const gunCopy: Gun = JSON.parse(JSON.stringify(baseGun));

          // ✅ Override limpio con tipado dinámico
          gunCopy.stats = gunCopy.stats.map((stat) => {
            const overrides = gunRef.overrides as { [key: string]: number };
            const overrideValue = overrides?.[stat.label];
            if (overrideValue !== undefined && overrideValue !== stat.value) {
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
