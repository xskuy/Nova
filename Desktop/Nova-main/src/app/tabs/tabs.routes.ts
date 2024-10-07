import type { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('../tab1/tab1.page').then((m) => m.Tab1Page), // Lazy-loaded Tab1
      },
      {
        path: 'tab2',
        loadComponent: () => import('../tab2/tab2.page').then((m) => m.Tab2Page), // Lazy-loaded Tab2
      },
      {
        path: 'tab3',
        loadComponent: () => import('../tab3/tab3.page').then((m) => m.Tab3Page), // Lazy-loaded Tab3
      },
      {
        path: 'registro',
        loadComponent: () => import('../registro/registro.page').then((m) => m.RegistroPage), // Lazy-loaded Registro Page
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full', // Redirect to Tab1 by default
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full', // Redirect root to Tabs
  },
  {
    path: '**',
    redirectTo: '/tabs/tab1', // Wildcard route to handle invalid paths
  },
];



