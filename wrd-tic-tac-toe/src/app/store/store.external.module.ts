import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { GameState } from '@app/store/game.state';
import { NgxsConfig } from '@ngxs/store/src/symbols';
import { NgxsDevtoolsOptions, NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin';
import { ThemeState } from '@app/store/theme.state';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
  /**
   * Run in development mode. This will add additional debugging features:
   * - Object.freeze on the state and actions to guarantee immutability
   * import { environment } from '@env';
   * developmentMode: !environment.production
   */
  developmentMode: true
};

export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
  /**
   * Whether the dev tools is enabled or note. Useful for setting during production.
   * import { environment } from '@env';
   * disabled: environment.production
   */
  disabled: false
};

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  /**
   * Disable the logger. Useful for prod mode..
   * import { environment } from '@env';
   * disabled: environment.production
   */
  disabled: false
};

const APP_STATES = [ GameState, ThemeState ];

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot(APP_STATES, OPTIONS_CONFIG),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsEmitPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ key: [ 'theme.theme' ] })
  ],
  exports: [ NgxsModule ]
})
export class NgxsStoreModule {
}
