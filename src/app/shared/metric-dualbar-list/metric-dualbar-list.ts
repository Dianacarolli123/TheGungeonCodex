import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingEntry } from '../../models/ranking';
import { FloorAppearance } from '../../models/enemies-appearance';
import rankingData from '../../../assets/ranking.json';

@Component({
  selector: 'app-metric-dualbar-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metric-dualbar-list.html',
  styleUrl: './metric-dualbar-list.css',
})
export class RankingGungeoneers implements OnInit {
  @Input() isEnemyView: boolean = false;
  @Input() enemyStatsNormal: FloorAppearance[] = [];
  @Input() enemyStatsSpecial: FloorAppearance[] = [];

  entries: RankingEntry[] = [];
  leftColumn: any[] = [];
  rightColumn: any[] = [];

  ngOnInit(): void {
    if (this.isEnemyView) {
      this.leftColumn = this.enemyStatsNormal;
      this.rightColumn = this.enemyStatsSpecial;
    } else {
      const sorted = [...rankingData].sort((a, b) => b.stat - a.stat);
      const midpoint = Math.ceil(sorted.length / 2);
      this.leftColumn = sorted.slice(0, midpoint);
      this.rightColumn = sorted.slice(midpoint);
    }
  }
  getEntryValue(entry: any): number {
    return this.isEnemyView ? entry.value : entry.stat;
  }
}
