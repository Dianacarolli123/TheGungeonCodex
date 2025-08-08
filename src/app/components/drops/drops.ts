import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import dropsData from '../../../assets/drops.json';
import sections from '../../../assets/sections.json';
import { Title } from '../../shared/title/title';
import { List } from '../../shared/list/list';
import { Drop } from '../../models/drops';

@Component({
  selector: 'app-drops',
  standalone: true,
  imports: [CommonModule, Title, List],
  templateUrl: './drops.html',
  styleUrls: ['./drops.css']
})
export class Drops implements OnInit {
  drops: Drop[] = [];
  rotatingImg: string = '';
  currentIndex = 0;

  ngOnInit(): void {
    const buttonImg = sections.find(s => s.slug === 'drops')?.srcImg;

    // 🔹 Filtra drops que no usen la imagen del botón
    const filtered = dropsData.filter(d => d.srcImg !== buttonImg);
    this.drops = filtered;

    // 🔹 Imagen inicial aleatoria
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      this.currentIndex = randomIndex;
      this.rotatingImg = filtered[randomIndex]?.srcImg || '';

      // 🔁 Rotación automática
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.drops.length;
        this.rotatingImg = this.drops[this.currentIndex].srcImg;
      }, 1500);
    });
  }
}