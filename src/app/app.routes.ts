import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((mod) => mod.HomeComponent)
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./game-settings/game-settings.component').then(
        (mod) => mod.GameSettingsComponent
      )
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./game/game.component').then((mod) => mod.GameComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((mod) => mod.AboutComponent)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
