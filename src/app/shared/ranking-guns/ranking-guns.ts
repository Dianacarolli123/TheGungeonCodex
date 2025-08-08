import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import rankingData from '../../../assets/ranking-guns.json';
import gunsData from '../../../assets/guns.json';
import gungeoneersData from '../../../assets/gungeoneers.json';

import { Gun } from '../../models/guns';
import { GunRankingEntry } from '../../models/ranking-guns';
import { GunReference } from '../../models/shared/gun-ranking';
import { Gungeoneer } from '../../models/gungeoneers';

@Component({
  selector: 'app-ranking-guns',
  templateUrl: './ranking-guns.html',
  styleUrls: ['./ranking-guns.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RankingGuns implements OnInit, OnChanges {
  @Input() guns: Gun[] = [];
  @Input() currentOwner: string = 'Gungeoneer';
  @Input() isEnemyView: boolean = false;
  @Input() context: 'enemy' | 'gungeoneer' | 'gun' | 'item' | 'drop' = 'enemy';

  gunRankingList: Gun[] = [];
  ownerDisplayName: string = '';
  startingGuns: Gun[] = [];

  ngOnInit(): void {
    const slug = this.slugify(this.currentOwner);
    const gungeoneer = this.findGungeoneer(slug);

    // 🔹 Mostrar ranking solo si NO es The Paradox
    if (slug !== 'the-paradox') {
      if (this.guns.length > 0) {
        this.gunRankingList = this.guns;
        this.ownerDisplayName = this.currentOwner;
      } else {
        const entry = this.findRankingEntry(slug);
        if (entry) {
          this.gunRankingList = this.buildGunList(entry);
          this.ownerDisplayName = entry.name;
        } else {
          console.warn('No se encontró entrada de armas para:', slug);
        }
      }
    } else {
      this.gunRankingList = []; // 🔒 No mostrar recomendaciones para Paradox
      this.ownerDisplayName = gungeoneer?.name || this.currentOwner;
    }

    // 🔹 Armas iniciales
    if (gungeoneer?.startingWeapons?.length) {
      const cleanedWeapons = gungeoneer.startingWeapons.filter(name => name.trim() !== '');

      this.startingGuns = cleanedWeapons
        .map(name => {
          if (name.trim().toLowerCase() === 'randomized') {
            return {
              id: -1,
              name: 'Randomized',
              description: 'Este personaje comienza con 2 armas aleatorias.',
              descriptionOverview: 'Comienzo aleatorio',
              srcImg: 'assets/img/randomquestion.png',
              stats: []
            } as Gun;
          }
          return this.findStartingGun(name);
        })
        .filter((gun): gun is Gun => !!gun);

      if (!this.startingGuns.length) {
        console.warn('⚠️ Armas iniciales vacías o inválidas para:', slug);
      }
    } else {
      this.startingGuns = [];
      console.warn('⚠️ El personaje no tiene armas iniciales definidas:', slug);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentOwner']?.currentValue) {
      this.ownerDisplayName = changes['currentOwner'].currentValue;
    }
  }

  findRankingEntry(name: string): GunRankingEntry | undefined {
    return rankingData.find(
      entry => this.slugify(entry.name) === this.slugify(name)
    );
  }

  findGungeoneer(slug: string): Gungeoneer | undefined {
    return gungeoneersData.find(
      g => this.slugify(g.name) === slug
    );
  }

  buildGunList(entry: GunRankingEntry): Gun[] {
    return entry.guns
      .map((gunRef: GunReference): Gun | null => {
        const baseGun = gunsData.find(
          g => this.slugify(g.name) === this.slugify(gunRef.label)
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
  }

  findStartingGun(name: string): Gun | undefined {
    return gunsData.find(
      gun => this.slugify(gun.name) === this.slugify(name)
    );
  }

  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }
}