import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsConfig } from '@ngxs/store/src/symbols';
import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin/src/symbols';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin/src/symbols';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { environment } from '@env/environment';
import { MasterState } from '@app/store/master.state';

/**
 * Additional configuration - subset of @link{NgxsConfig}
 */
export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
  /**
   * Run in development mode. This will add additional debugging features:
   * - Object.freeze on the state and actions to guarantee immutability
   */
  developmentMode: environment.mock ? true : !environment.production
};

/**
 * Additional configuration - subset of @link{NgxsDevtoolsOptions}
 */
export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
  /**
   * Whether the dev tools is enabled or note. Useful for setting during production.
   */
  disabled: environment.mock ? false : environment.production
};

/**
 * Additional configuration - subset of @link{NgxsLoggerPluginOptions}
 */
export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  /**
   * Disable the logger. Useful for prod mode..
   */
  disabled: environment.mock ? false : environment.production
};

/**
 * The managed state objects
 */
const APP_STATES = [ MasterState ];

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot(APP_STATES, OPTIONS_CONFIG),
    NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
    NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
    NgxsEmitPluginModule.forRoot()
  ],
  exports: [ NgxsModule ]
})
export class NgxsStoreModule {
}
