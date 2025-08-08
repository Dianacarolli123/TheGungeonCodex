import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  @Input() items: { name: string; srcImg: string; stats?: { label: string }[] }[] = [];
  @Input() title: string = '';
  @Input() showTier: boolean = false;
  @Input() baseRoute: string = ''; // 👈 aquí defines la ruta base para navegación

  columns: { name: string; srcImg: string; stats?: { label: string }[] }[][] = [[], [], []];

  constructor(private router: Router) {} // 👈 este es el constructor que inyecta el Router

  ngOnInit(): void {
    this.items.forEach((item, index) => {
      this.columns[index % 3].push(item);
    });
  }

  getBgClass(index: number): string {
    return index % 2 === 0 ? 'bg-first' : 'bg-second';
  }

  getBorderRadiusClass(index: number, column: any[]): string {
    if (index === 0) return 'exteriors-top';
    if (index === column.length - 1) return 'exteriors-bottom';
    return '';
  }

  handleClick(item: { name: string }): void {
    if (!this.baseRoute || !item?.name) return;
    const slug = item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    this.router.navigate([`/${this.baseRoute}`, slug]);
  }
}