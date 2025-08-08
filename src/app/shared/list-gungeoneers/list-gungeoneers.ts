import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import overviewData from '../../../assets/gungeoneers-initial-overviews.json';
import { GungeoneerOverview } from '../../models/gungeoneer-overview';

interface GungeoneerSection {
  overviewData: GungeoneerOverview;
  variants: string[];
}

@Component({
  selector: 'app-list-gungeoneers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-gungeoneers.html',
  styleUrl: './list-gungeoneers.css'
})
export class ListGungeoneers {
  @Input() baseRoute: string = 'gungeoneers';

  overviews: GungeoneerOverview[] = overviewData;

  // 👇 Personajes que deben mostrarse incluso sin variantes
  private alwaysInclude: string[] = ['The Paradox', 'The Gunslinger'];

  sections: GungeoneerSection[] = this.overviews
    .filter(o =>
      (Array.isArray(o.version01) && o.version01.some(v => v.trim() !== '')) ||
      this.alwaysInclude.includes(o.name)
    )
    .map(o => ({
      overviewData: o,
      variants: Array.isArray(o.version01)
        ? o.version01.filter(v => v.trim() !== '')
        : []
    }));

  leftSections: GungeoneerSection[] = [];
  rightSections: GungeoneerSection[] = [];

  constructor(private router: Router) {
    const total = this.sections.length;
    const split = Math.ceil(total / 2);
    this.leftSections = this.sections.slice(0, split);
    this.rightSections = this.sections.slice(split);
    console.log('Total personajes mostrados (variantes + excepciones):', this.sections.length);
  }

  slugifyGungeoneer(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '').replace(/[^\w]/g, '');
  }

  goToDetail(name: string): void {
    if (!name) return;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    this.router.navigate([`/${this.baseRoute}`, slug]);
  }
}