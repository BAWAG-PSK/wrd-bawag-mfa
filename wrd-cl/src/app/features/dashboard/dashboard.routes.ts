import { Route } from '@angular/router';
import { DashboardComponent } from '@app/features/dashboard/dashboard.component';
import { APP_PROFILE, APP_QUIZ, APP_STATISTICS, APP_TIC_TAC_TOE } from '@app/app.constants';
import { AppLoader } from '@app/app-loader/app-loader';
import { getRouter } from '@app/app.utils';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: APP_QUIZ,
        loadChildren: () => AppLoader.loadApp(`/assets/${ APP_QUIZ }`).catch(e => getRouter().navigate([ 'maintenance' ]))
      },
      {
        path: APP_TIC_TAC_TOE,
        loadChildren: () => AppLoader.loadApp(`/assets/${ APP_TIC_TAC_TOE }`).catch(e => getRouter().navigate([ 'maintenance' ]))
      },
      {
        path: APP_STATISTICS,
        loadChildren: () => AppLoader.loadApp(`/assets/${ APP_STATISTICS }`).catch(e => getRouter().navigate([ 'maintenance' ]))
      },
      {
        path: APP_PROFILE,
        loadChildren: () => AppLoader.loadApp(`/assets/${ APP_PROFILE }`).catch(e => getRouter().navigate([ 'maintenance' ]))
      }
    ]
  }
];
