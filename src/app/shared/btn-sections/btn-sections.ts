import { Component } from '@angular/core';
import sectionsData from '../../../assets/sections.json';
import { SectionEntry } from '../../models/sections';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-sections',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './btn-sections.html',
  styleUrls: ['./btn-sections.css']
})
export class BtnSections {
  sections: SectionEntry[] = sectionsData.slice(1, 6); // Solo los cinco que deseas
}