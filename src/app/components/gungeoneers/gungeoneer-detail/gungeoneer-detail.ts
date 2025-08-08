import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import gungeoneersData from '../../../../assets/gungeoneers.json';
import overviewData from '../../../../assets/gungeoneers-initial-overviews.json';
import compendiumData from '../../../../assets/gungeoneers-compendium.json';
import rankingData from '../../../../assets/ranking.json';
import gunsData from '../../../../assets/guns.json';
import strategicBalanceData from '../../../../assets/strategic-balance.json';
import rankingGunsData from '../../../../assets/ranking-guns.json';

import { GungeoneerOverview } from '../../../models/gungeoneer-overview';
import { GungeoneerCompendium } from '../../../models/aliases';
import { RankingEntry } from '../../../models/ranking';
import { StrategicBalanceEntry } from '../../../models/strategic-balance';
import { Gun } from '../../../models/guns';
import { GunReference } from '../../../models/shared/gun-ranking';
import { GunRankingEntry } from '../../../models/ranking-guns';

import { Title } from '../../../shared/title/title';
import { InitialOverview } from '../../../shared/initial-overview/initial-overview';
import { Compendium } from '../../../shared/compendium/compendium';
import { Ranking } from '../../../shared/ranking/ranking';
import { StrategicBalance } from '../../../shared/strategic-balance/strategic-balance';
import { RankingGuns } from '../../../shared/ranking-guns/ranking-guns';
import { RecommendedItems } from '../../../shared/recommended-items/recommended-items';

@Component({
  selector: 'app-gungeoneer-detail',
  standalone: true,
  imports: [
    CommonModule,
    Title,
    InitialOverview,
    Compendium,
    Ranking,
    StrategicBalance,
    RankingGuns,
    RecommendedItems,
  ],
  templateUrl: './gungeoneer-detail.html',
  styleUrl: './gungeoneer-detail.css',
})
export class GungeoneerDetail implements OnInit {
  gungeoneer: any;
  overview?: GungeoneerOverview;
  versionDetail?: any;
  compendiumEntry!: GungeoneerCompendium;
  rankingEntry!: RankingEntry;
  strategicEntry!: StrategicBalanceEntry;
  gunRankingEntry?: GunRankingEntry;
  gunRankingList: Gun[] = [];
  isDetailView = true;
  isParadox = false;
  showRecommendedItems = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slugParam = this.slugify(this.route.snapshot.paramMap.get('name') || '');
    console.log('Ruta normalizada:', slugParam);

    this.isParadox = slugParam === 'the-paradox';

    this.strategicEntry = strategicBalanceData.find(entry =>
      this.matchSlug(entry.name, slugParam)
    )!;

    this.rankingEntry = rankingData.find(entry =>
      this.matchSlug(entry.name, slugParam)
    )!;

    this.compendiumEntry = compendiumData.find(entry =>
      this.matchSlug(entry.name, slugParam)
    )!;

    this.gungeoneer = gungeoneersData.find(p =>
      this.matchSlug(p.name, slugParam)
    );

    // ⚙️ Definir visibilidad de ítems recomendados
    this.showRecommendedItems =
      !this.isParadox &&
      this.gungeoneer?.startingItems?.[0] !== 'Randomized';

    this.overview = overviewData.find(o =>
      this.matchSlug(o.name, slugParam)
    );

    if (!this.overview) {
      console.warn('No se encontró overview para:', slugParam);
      return;
    }

    const variantName = Array.isArray(this.overview.version01)
      ? this.overview.version01.find(v => v.trim() !== '')
      : '';

    this.versionDetail = gungeoneersData.find(p =>
      this.matchSlug(p.name, this.slugify(variantName || ''))
    );

    // 🔒 Evitar ranking de armas si es The Paradox
    if (this.isParadox) {
      console.info('🛡️ The Paradox comienza con armas e ítems aleatorios. Se omite ranking y recomendaciones.');
      this.gunRankingList = []; // evita render de armas
      return; // permite que la vista principal se cargue normalmente
    }

    this.gunRankingEntry = rankingGunsData.find(entry =>
      this.matchSlug(entry.name, slugParam)
    );

    if (!this.gunRankingEntry) {
      console.warn('No se encontró entrada de armas para:', slugParam);
      this.gunRankingList = [];
      return;
    }

    this.gunRankingList = this.gunRankingEntry.guns
      .map((gunRef: GunReference): Gun | null => {
        const baseGun = gunsData.find(g =>
          this.matchSlug(g.name, gunRef.label)
        );
        if (!baseGun) {
          console.warn(`No se encontró el arma base: ${gunRef.label}`);
          return null;
        }

        const gunCopy: Gun = JSON.parse(JSON.stringify(baseGun));

        if (gunRef.overrides) {
          gunCopy.stats = gunCopy.stats.map(stat => {
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

    console.log('Gungeoneer que se manda al compendium:', this.gungeoneer);
    console.log('Armas encontradas para ranking:', this.gunRankingList);
  }

  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }

  matchSlug(a: string, b: string): boolean {
    const normalize = (text: string) =>
      text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return normalize(a) === normalize(b);
  }
}