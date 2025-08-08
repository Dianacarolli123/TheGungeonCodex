import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drop } from '../../models/drops';
import { GungeoneerOverview } from '../../models/gungeoneer-overview';

@Component({
  selector: 'app-initial-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './initial-overview.html',
  styleUrl: './initial-overview.css'
})
export class InitialOverview {
  @Input() data!: any;
  @Input() gungeoneer!: any;
  @Input() versionDetail!: any;
  @Input() highlights?: { label: string }[];
  @Input() imgSrc!: string;
  @Input() context?: string;

  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '').replace(/[^\w-]/g, '');
  }

  getBenefits(): string[] {
    return (this.data as any)?.data ?? [];
  }
  getVersionPast(variant: string): string {
    const normalized = this.slugify(variant);
    const matches = Array.isArray(this.versionDetail)
      ? this.versionDetail.find(v => this.slugify(v.name) === normalized)
      : (this.versionDetail?.name && this.slugify(this.versionDetail.name) === normalized)
        ? this.versionDetail
        : null;

    return matches?.pasado ?? ' ';
  }
  hasValidVariants(): boolean {
  const variants: string[] = this.data?.version01 || [];
  return variants.some(v => v.trim() !== '');
}
}