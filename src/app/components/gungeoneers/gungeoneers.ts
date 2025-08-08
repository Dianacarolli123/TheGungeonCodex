import { Component, OnInit } from '@angular/core';
import gungeoneersData from '../../../assets/gungeoneers.json';
import strategicData from '../../../assets/strategic-balance.json';
import sections from '../../../assets/sections.json';
import { CommonModule } from '@angular/common';
import { Title } from '../../shared/title/title';
import { ListGungeoneers } from '../../shared/list-gungeoneers/list-gungeoneers';
import { RankingGungeoneers } from '../../shared/metric-dualbar-list/metric-dualbar-list';
import { StrategicBalance } from '../../shared/strategic-balance/strategic-balance';
import { StrategicBalanceEntry } from '../../models/strategic-balance';
import { Stat } from '../../models/shared/stat';
import { Gungeoneer } from '../../models/gungeoneers';

@Component({
  selector: 'app-gungeoneers',
  standalone: true,
  imports: [
    CommonModule,
    Title,
    ListGungeoneers,
    RankingGungeoneers,
    StrategicBalance,
  ],
  templateUrl: './gungeoneers.html',
  styleUrls: ['./gungeoneers.css'],
})
export class Gungeoneers implements OnInit {
  gungeoneers: Gungeoneer[] = [];
  balanceEntries: StrategicBalanceEntry[] = strategicData;
  balanceSummary: Stat[] = [];
  rotatingImg: string = '';
  currentIndex = 0;
  ngOnInit(): void {
    const buttonImg = sections.find((s) => s.slug === 'gungeoneers')?.srcImg;

    // 🔹 Filtra personajes que no usen la imagen del botón
    const filtered = gungeoneersData.filter((g) => g.srcImg !== buttonImg);
    this.gungeoneers = filtered;

    // 🔹 Espera un ciclo de render para evitar que Angular pinte algo antes
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      this.currentIndex = randomIndex;
      this.rotatingImg = filtered[randomIndex]?.srcImg || '';

      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.gungeoneers.length;
        this.rotatingImg = this.gungeoneers[this.currentIndex].srcImg;
      }, 1500);
    });

    // 🔹 Calcula promedio de stats por personaje
    this.balanceSummary = this.balanceEntries.map((entry) => {
      const total = entry.stats.reduce((sum, stat) => {
        const numericValue = typeof stat.value === 'number' ? stat.value : 0;
        return sum + numericValue;
      }, 0);
      const avg = total / entry.stats.length;
      return {
        label: entry.name,
        value: parseFloat(avg.toFixed(1)),
      };
    });
  }

  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }
}
