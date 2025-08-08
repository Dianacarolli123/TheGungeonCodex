import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import itemsData from '../../../assets/items.json';
import recommendedGunsData from '../../../assets/items-recommended-guns.json';
import recommendedGungeoneersData from '../../../assets/items-recommended.json';
import recommendedDropsData from '../../../assets/items-recommended-drops.json';
import recommendedItemsData from '../../../assets/items-recommended-items.json';
import gungeoneersData from '../../../assets/gungeoneers.json';

import { BaseItem } from '../../models/items';
import { RecommendedEffect } from '../../models/items-recommended';
import { RecommendedDropEffect } from '../../models/items-recommended-drops';
import { RecommendedItemEffect } from '../../models/items-recommended-items';

interface EnhancedItem extends BaseItem {
  synergyEffect: string;
}

@Component({
  selector: 'app-recommended-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommended-items.html',
  styleUrl: './recommended-items.css',
})
export class RecommendedItems implements OnInit {
  @Input() currentGun = '';
  @Input() currentGungeoneer = '';
  @Input() currentDrop = '';
  @Input() currentItem = '';
  @Input() context: 'gun' | 'gungeoneer' | 'drop' | 'item' = 'gun';

  recommendedItems: EnhancedItem[] = [];
  startingItems: BaseItem[] = [];

  ngOnInit(): void {
    const name =
      this.context === 'gun' ? this.currentGun :
      this.context === 'gungeoneer' ? this.currentGungeoneer :
      this.context === 'drop' ? this.currentDrop :
      this.currentItem;

    const source =
      this.context === 'gun' ? recommendedGunsData :
      this.context === 'gungeoneer' ? recommendedGungeoneersData :
      this.context === 'drop' ? recommendedDropsData :
      recommendedItemsData;

    this.recommendedItems = this.buildRecommendedList(name, source);

    if (this.context === 'gungeoneer') {
      const gungeoneer = gungeoneersData.find(
        g => this.slugify(g.name) === this.slugify(this.currentGungeoneer)
      );

      // 🔒 Blindaje para ítems aleatorios tipo "Randomized"
      if (gungeoneer?.startingItems?.includes('Randomized')) {
        console.info(`🛡️ ${gungeoneer.name} tiene ítems iniciales aleatorios`);

        this.startingItems = [{
          id: 0,
          name: 'Randomized',
          description: 'Este personaje comienza con ítems aleatorios, sin efectos predecibles.',
          descriptionOverview: 'Ítems iniciales aleatorios. Su efecto varía entre partidas.',
          srcImg: 'assets/img/randomquestion.png',
          stats: [],
          statsOverview: [],
          statsItems: []
        }];

        this.recommendedItems = [];
        return;
      }

      if (gungeoneer?.startingItems?.length) {
        this.startingItems = gungeoneer.startingItems
          .map(name =>
            itemsData.find(i => this.slugify(i.name) === this.slugify(name))
          )
          .filter((item): item is BaseItem => !!item);
        console.log('🧩 Ítems iniciales encontrados:', this.startingItems);
      } else {
        console.warn('No se encontraron ítems iniciales para:', this.currentGungeoneer);
      }
    }
  }

  buildRecommendedList(
    name: string,
    source: Array<RecommendedEffect | RecommendedDropEffect | RecommendedItemEffect>
  ): EnhancedItem[] {
    const results: EnhancedItem[] = [];

    source.forEach((rec) => {
      const statsMatch = rec.stats.filter(
        stat => this.slugify(stat.label) === this.slugify(name)
      );

      statsMatch.forEach((stat) => {
        const item = itemsData.find(
          i => this.slugify(i.name) === this.slugify(rec.name)
        );
        if (item) {
          results.push({ ...item, synergyEffect: stat.value });
        }
      });
    });

    return results;
  }

  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }
}