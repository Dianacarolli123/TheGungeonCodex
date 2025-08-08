import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import sectionData from '../../../assets/sections.json';
import { SectionEntry } from '../../models/sections';
@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.html',
  styleUrls: ['./title.css']
})
export class Title implements OnInit {
  @Input() personaje?: string;
  @Input() description?: string;
  @Input() srcImg?: string;
  @Input() customText: string = '';
  @Input() headerText: string = "We're going to talk about...";
  @Input() imgClass: string = '';
  @Input() imgHeight: number | null = null;
  ngOnInit(): void {
    if (!this.personaje || !this.description || !this.srcImg) {
      const slug = this.getCurrentSlug();
      const section = sectionData.find((s: SectionEntry) => s.slug === slug);
      if (section) {
        this.personaje = section.title;
        this.description = section.description;
        this.srcImg = section.srcImg;
      }
    }
  }

  getCurrentSlug(): string {
    const url = window.location.href;
    const segments = url.split('/');
    // Si la ruta es: localhost:4200/items → 'items'
    // Si la ruta es: localhost:4200/gun/hexagun → 'guns'
    return segments[3]?.includes('-') ? segments[2] : segments[3] || 'home';
  }
}