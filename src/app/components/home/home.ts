import { Component } from '@angular/core';
import { Title } from '../../shared/title/title';
import { HttpClient } from '@angular/common/http';
import gungeoneers from '../../../assets/gungeoneers.json';
import sections from '../../../assets/sections.json';
import { BtnSections } from '../../shared/btn-sections/btn-sections';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Title, BtnSections],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  personaje = gungeoneers.find(e => e.id === 1);
  section = sections.find(s => s.slug === 'Home');

  srcImg: string = this.section?.srcImg || '';
  headerText: string = 'Hello! :) \nWelcome to \nmy website!';
  description: string = this.section?.description || '';
}