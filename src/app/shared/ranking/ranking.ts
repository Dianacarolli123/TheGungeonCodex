import { Component, Input, OnInit } from '@angular/core';
import { RankingEntry } from '../../models/ranking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css'
})

export class Ranking {
  @Input() rankingEntry!: RankingEntry;
}