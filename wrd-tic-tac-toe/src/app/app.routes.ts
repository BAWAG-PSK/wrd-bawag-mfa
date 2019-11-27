import { AppComponent } from './app.component';
import { HomescreenComponent } from './features/homescreen/homescreen.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'home', component: HomescreenComponent },
  {
    path: 'start',
    loadChildren: () => import('./features/game/game.module').then(m => m.GameModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const appStatesExternal = [{ path: '', component: AppComponent, children: appRoutes }];
