import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import itemsData from '../../../assets/items.json';
import sections from '../../../assets/sections.json';
import { Title } from '../../shared/title/title';
import { List } from '../../shared/list/list';
import { BaseItem } from '../../models/items'; // o Drop, si usas ese nombre

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, Title, List],
  templateUrl: './items.html',
  styleUrls: ['./items.css'],
})
export class Items implements OnInit {
  items: BaseItem[] = [];
  rotatingImg: string = '';
  currentIndex = 0;

  ngOnInit(): void {
    const buttonImg = sections.find(s => s.slug === 'items')?.srcImg;

    // 🔹 Filtra ítems que no usen la imagen del botón
    const filtered = itemsData.filter(i => i.srcImg !== buttonImg);
    this.items = filtered;

    // 🔹 Imagen inicial aleatoria
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      this.currentIndex = randomIndex;
      this.rotatingImg = filtered[randomIndex]?.srcImg || '';

      // 🔁 Rotación automática
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.rotatingImg = this.items[this.currentIndex].srcImg;
      }, 1500);
    });
  }
}