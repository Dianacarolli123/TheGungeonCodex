import { Component, Input, OnInit } from '@angular/core';
import { GungeoneerCompendium } from '../../models/aliases';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compendium',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compendium.html',
  styleUrls: ['./compendium.css']
})
export class Compendium implements OnInit {
  @Input() compendiumData!: GungeoneerCompendium;
  @Input() entityType: 'enemy' | 'gungeoneer' | 'item' | 'drop' | 'gun' = 'enemy';

  ngOnInit() {
    console.log('Datos recibidos:', this.compendiumData);
  }
}
