import { Route } from '@angular/router';
import { APP_LOGIN } from '@app/app.constants';
import { environment } from '@env/environment';
import { getRouter } from '@app/app.utils';
import { AppLoader } from '@app/app-loader/app-loader';
import { MaintenanceComponent } from '@app/features/maintenance/maintenance.component';
import { PageNotFoundComponent } from '@app/features/page-not-found/page-not-found.component';
import { isLocalhostOnOwnPort } from '@app/shared/utils/dev.utils';
import { REFRESH_RESOLVER_SERVICE } from '@app/core/resolver/refresh/refresh-resolver.service';
import { DashboardComponent } from '@app/features/dashboard/dashboard.component';

/** '/' -> 99% of cases 'login' or the last page in case of page refresh (F5) */
export const initial: Route = {
  path: '',
  component: MaintenanceComponent, // just a dummy component that never gets displayed
  resolve: { refresh: REFRESH_RESOLVER_SERVICE }
};

/** 'login' */
const login: Route = {
  path: APP_LOGIN,
  loadChildren: () => AppLoader.loadApp(`/assets/${ APP_LOGIN }`).catch(e => handleError(APP_LOGIN, e))
};

/** 'dashboard' */
const dashboard: Route = {
  path: 'dashboard',
  loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
};

/** all MFs */
const MICRO_FRONTENDS = [ login ];

/** global maintenance page */
const maintenance: Route = { path: 'maintenance', component: MaintenanceComponent };
/** unknown page */
const pageNotFound: Route = { path: 'page-not-found', component: PageNotFoundComponent };
/** unknown route -> 'page-not-found' */
const noRouteMatch: Route = { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' };

/** all non-MFs */
const OTHER_ROUTES = [ dashboard, maintenance, pageNotFound, noRouteMatch ];

function handleError(app: string, e?: Error): void | Promise<any> {
  switch (app) {
    // SYSTEM RELEVANT MFs (LogLevel.FATAL)
    case APP_LOGIN:
      console.log(e);
      getRouter().navigate([ 'maintenance' ]);
      break;
  }
}

/** initial route for mock mode (we cannot redirect to MF if it is not there) */
const initialMock: Route = { path: '', redirectTo: 'dummy', pathMatch: 'full' };
/** dummy landing page */
const dummy: Route = {
  path: 'dummy',
  component: DashboardComponent
};

/**
 * NOTE: THIS DOES NOT WORK WHEN BUILD WITH AOT, that's why npm run serve:mock is still JIT ("aot"=false)
 * In build:prod:mock we want to display the MF!!!
 *
 * Only in mock mode and if served on the own port (ng serve and not npm run serve:prod).
 * initialMock will redirect to dummy where the AuthGuardServiceMock sets us to "authenticated=true",
 * which will change the layout from one main router outlet to the 3 column layout (post-login).
 */
export const APP_ROUTES =
  (environment.mock && !environment.production || environment.hmr) || isLocalhostOnOwnPort(50001)
    ? [ initialMock, dummy, ...MICRO_FRONTENDS, ...OTHER_ROUTES ]
    : [ initial, ...MICRO_FRONTENDS, ...OTHER_ROUTES ];
