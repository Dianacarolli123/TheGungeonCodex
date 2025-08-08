import { Routes } from '@angular/router';
import { Nav } from './shared/nav/nav';
import { Footer } from './shared/footer/footer'; 

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
    data: { title: 'TGC | Home' },
  },
  { 
    path: 'gungeoneers', 
    loadComponent: () =>
      import('./components/gungeoneers/gungeoneers').then(m => m.Gungeoneers),
    data: { title: 'Gungeoneers' }
  },
  { 
    path: 'enemies', 
    loadComponent: () =>
      import('./components/enemies/enemies').then(m => m.Enemies),
    data: { title: 'Gungeoneers' }
  },
  { 
    path: 'guns', 
    loadComponent: () =>
      import('./components/guns/guns').then(m => m.Guns),
    data: { title: 'Gungeoneers' }
  },
  { 
    path: 'drops', 
    loadComponent: () =>
      import('./components/drops/drops').then(m => m.Drops),
    data: { title: 'Gungeoneers' }
  },
  { 
    path: 'items', 
    loadComponent: () =>
      import('./components/items/items').then(m => m.Items),
    data: { title: 'Gungeoneers' }
  },
  {
    path: 'gungeoneers/:name',
    loadComponent: () => import('./components/gungeoneers/gungeoneer-detail/gungeoneer-detail').then(m => m.GungeoneerDetail),
    data: { title: 'Detalle Gungeoneer' }
  },
  {
    path: 'drops/:name',
    loadComponent: () => import('./components/drops/drops-detail/drops-detail').then(m => m.DropsDetail),
    data: { title: 'Detalle Gungeoneer' }
  },
  {
    path: 'enemies/:name',
    loadComponent: () => import('./components/enemies/enemies-detail/enemies-detail').then(m => m.EnemiesDetail),
    data: { title: 'Detalle Enemigo' }
  },
  {
    path: 'guns/:name',
    loadComponent: () => import('./components/guns/guns-detail/guns-detail').then(m => m.GunsDetail),
    data: { title: 'Detalle Arma' }
  },
  {
    path: 'items/:name',
    loadComponent: () => import('./components/items/items-detail/items-detail').then(m => m.ItemsDetail),
    data: { title: 'Detalle Ítem' }
  }  
];


