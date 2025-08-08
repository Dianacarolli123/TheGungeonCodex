import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gunsData from '../../../assets/guns.json';
import sections from '../../../assets/sections.json';
import { Title } from '../../shared/title/title';
import { List } from '../../shared/list/list';
import { Gun } from '../../models/guns';

@Component({
  selector: 'app-guns',
  standalone: true,
  imports: [CommonModule, Title, List],
  templateUrl: './guns.html',
  styleUrls: ['./guns.css']
})
export class Guns implements OnInit {
  guns: Gun[] = [];
  rotatingImg: string = '';
  currentIndex = 0;

  ngOnInit(): void {
    const buttonImg = sections.find(s => s.slug === 'guns')?.srcImg;

    // 🔹 Filtra armas que no usen la imagen del botón
    const filtered = gunsData.filter(g => g.srcImg !== buttonImg);
    this.guns = filtered;

    // 🔹 Espera un ciclo de render para evitar que Angular pinte antes de tener imagen
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      this.currentIndex = randomIndex;
      this.rotatingImg = filtered[randomIndex]?.srcImg || '';

      // 🔁 Rotación automática
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.guns.length;
        this.rotatingImg = this.guns[this.currentIndex].srcImg;
      }, 1500);
    });
  }
}