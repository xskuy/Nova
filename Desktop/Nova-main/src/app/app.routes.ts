import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes), // Lazy-loaded Tabs routing
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage), // Lazy-loaded Registro Page
  },
  {
    path: '**',
    redirectTo: '', // Wildcard route to catch invalid paths and redirect to the root (tabs)
  }
];

