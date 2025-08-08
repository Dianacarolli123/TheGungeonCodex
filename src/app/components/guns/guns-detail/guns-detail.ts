import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import gunsData from '../../../../assets/guns.json';
import { Gun } from '../../../models/guns';
import { Title } from '../../../shared/title/title';
import { InitialOverview } from '../../../shared/initial-overview/initial-overview';
import compendiumData from '../../../../assets/guns-compendium.json';
import { GunCompendium } from '../../../models/aliases';
import { Compendium } from '../../../shared/compendium/compendium';
import appearanceData from '../../../../assets/guns-appearance.json';
import { GunAppearance } from '../../../models/aliases';
import { RankingGungeoneers } from '../../../shared/metric-dualbar-list/metric-dualbar-list';
import rankingGunsData from '../../../../assets/ranking-guns-guns.json';
import { GunRankingSet } from '../../../models/aliases';
import { RankingGuns } from '../../../shared/ranking-guns/ranking-guns';
import { RecommendedItems } from '../../../shared/recommended-items/recommended-items';

@Component({
  selector: 'app-guns-detail',
  standalone: true,
  imports: [
    CommonModule,
    Title,
    InitialOverview,
    Compendium,
    RankingGungeoneers,
    RankingGuns,
    RecommendedItems,
  ],
  templateUrl: './guns-detail.html',
  styleUrl: './guns-detail.css',
})
export class GunsDetail implements OnInit {
  gun!: Gun;
  gunCompendium!: GunCompendium;
  gunAppearance!: GunAppearance;
  gunRankingEntry!: GunRankingSet;
  gunRankingList!: Gun[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const nameParam = this.slugify(
      this.route.snapshot.paramMap.get('name') || ''
    );
    this.gun = gunsData.find((g) => this.slugify(g.name) === nameParam)!;
    this.gunCompendium = compendiumData.find(
      (g) => this.slugify(g.name) === nameParam
    )!;
    this.gunAppearance = appearanceData.find(
      (g) => this.slugify(g.name) === nameParam
    )!;
    this.gunRankingEntry = rankingGunsData.find(
      (r) => this.slugify(r.name) === this.slugify(this.gun.name)
    )!;
    this.gunRankingList = this.gunRankingEntry.guns
      .map((gunRef) => {
        const baseGun = gunsData.find(
          (g) => this.slugify(g.name) === this.slugify(gunRef.label)
        );
        if (!baseGun) return null;

        const gunCopy: Gun = JSON.parse(JSON.stringify(baseGun));

        if (gunRef.overrides) {
          gunCopy.stats = gunCopy.stats.map((stat) => {
            const overrideValue = gunRef.overrides?.[stat.label];
            if (overrideValue !== undefined && overrideValue !== stat.value) {
              stat.value = `${stat.value} → ${overrideValue}`;
            }
            return stat;
          });
        }

        return gunCopy;
      })
      .filter((g): g is Gun => g !== null);
  }

  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }
}
