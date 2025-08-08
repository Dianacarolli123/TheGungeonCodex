import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import overviewData from '../../../../assets/enemies.json';
import compendiumData from '../../../../assets/enemies-compendium.json';
import appearanceData from '../../../../assets/enemies-appearance.json';
import gunsData from '../../../../assets/guns.json';
import { Enemy } from '../../../models/enemies';
import { EnemyCompendium } from '../../../models/aliases';
import { EnemyAppearance } from '../../../models/enemies-appearance';
import { Gun } from '../../../models/guns';
import { Title } from '../../../shared/title/title';
import { InitialOverview } from '../../../shared/initial-overview/initial-overview';
import { Compendium } from '../../../shared/compendium/compendium';
import { RankingGungeoneers } from '../../../shared/metric-dualbar-list/metric-dualbar-list';
import { RankingGuns } from '../../../shared/ranking-guns/ranking-guns';

@Component({
  selector: 'app-enemies-detail',
  standalone: true,
  imports: [
    CommonModule,
    Title,
    InitialOverview,
    Compendium,
    RankingGungeoneers,
    RankingGuns,
  ],
  templateUrl: './enemies-detail.html',
  styleUrl: './enemies-detail.css',
})
export class EnemiesDetail implements OnInit {
  enemy!: Enemy;
  enemyCompendium!: EnemyCompendium;
  enemyAppearance!: EnemyAppearance;
  gunSet: Gun[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const nameParam = this.slugify(
      this.route.snapshot.paramMap.get('name') || ''
    );

    this.enemy = overviewData.find((e) => this.slugify(e.name) === nameParam)!;
    this.enemyCompendium = compendiumData.find(
      (e) => this.slugify(e.name) === nameParam
    )!;
    this.enemyAppearance = appearanceData.find(
      (e) => this.slugify(e.name) === nameParam
    )!;

    if (this.enemy?.statsGuns?.length) {
      const gunLabels = this.enemy.statsGuns.map((g) => g.label.trim());
      console.log('Buscando armas asignadas:', this.enemy.statsGuns);

      gunsData.forEach((gun) => console.log(`Verificando arma: ${gun.name}`));

      this.gunSet = gunsData.filter((g) => gunLabels.includes(g.name.trim()));

      console.log('Armas encontradas:', this.gunSet);
    } else {
      this.gunSet = [];
    }

    console.log('enemyAppearance:', this.enemyAppearance);
  }

  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }
}
