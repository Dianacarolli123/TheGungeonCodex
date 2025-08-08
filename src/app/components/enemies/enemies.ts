import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import enemiesData from '../../../assets/enemies.json';
import sections from '../../../assets/sections.json';
import { Title } from '../../shared/title/title';
import { Enemy } from '../../models/enemies';
import { List } from '../../shared/list/list';

@Component({
  selector: 'app-enemies',
  standalone: true,
  imports: [CommonModule, Title, List],
  templateUrl: './enemies.html',
  styleUrls: ['./enemies.css']
})
export class Enemies implements OnInit {
  enemies: Enemy[] = [];
  rotatingImg: string = '';
  currentIndex = 0;

  ngOnInit(): void {
    const buttonImg = sections.find(s => s.slug === 'enemies')?.srcImg;

    // 🔹 Filtra enemigos que no usen la imagen del botón
    const filtered = enemiesData.filter(e => e.srcImg !== buttonImg);
    this.enemies = filtered;

    // 🔹 Espera un ciclo de render para evitar que Angular pinte antes de tener imagen
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      this.currentIndex = randomIndex;
      this.rotatingImg = filtered[randomIndex]?.srcImg || '';

      // 🔁 Rotación automática
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.enemies.length;
        this.rotatingImg = this.enemies[this.currentIndex].srcImg;
      }, 1500);
    });
  }
}