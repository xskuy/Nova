import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then(m => m.WelcomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'asistencia',
    loadComponent: () => import('./asistencia/asistencia.component').then(m => m.AsistenciaComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'notfound',
    loadComponent: () => import('./notfound/notfound.component').then(m => m.NotfoundComponent)
  },
  {
    path: 'cursos',
    loadComponent: () => import('./cursos/cursos.page').then(m => m.CursosPage)
  },
  {
    path: 'notas',
    loadComponent: () => import('./notas/notas.page').then(m => m.NotasPage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'horario',
    loadComponent: () => import('./horario/horario.page').then( m => m.HorarioPage)
  },
  {
    path: '**',
    redirectTo: 'notfound' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
