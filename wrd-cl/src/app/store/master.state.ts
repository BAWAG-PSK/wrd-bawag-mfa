import { Selector, State, StateContext } from '@ngxs/store';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { AppRegistry } from '@app/app-loader/app-registry';
import { BootstrapConfig } from '@app/app-loader/models/bootstrap-config.model';
import { DomUtils } from '@app/app-loader/utils/dom.utils';

/**
 * Contains relevant information (id, bootstrap-config, state) for a MF.
 */
export interface AppStateModel {
  /** ID of the MF (e.g. login) */
  id: string;

  /** the exact bootstrap config */
  config: BootstrapConfig;

  /** whether it is already registered */
  registered: boolean;

  /** whether it has been destroyed */
  destroyed: boolean;
}

/**
 * The master state or app registry
 */
export interface MasterStateModel {
  /** array of app-state-models, created upon registration and never deleted */
  apps: AppStateModel[];
}

/**
 * Basically the app registry.
 */
@State<MasterStateModel>({
  name: 'master',
  defaults: {
    apps: []
  }
})
export class MasterState {

  constructor() {
  }

  /** factory method for the entry which represents the state of a MF inside the registry */
  static createAppStateModel = (id: string, config: BootstrapConfig, registered: boolean, destroyed: boolean): AppStateModel => {
    return { id, config, registered, destroyed } as AppStateModel;
  };

  /**
   * Creates a new entry in the app registry for a freshly bootstrapped MF which just registered at the CL.
   * Also, if the MF has been already loaded the stylesheet (which is still in the DOM, but disabled) gets enabled.
   */
  @Receiver()
  public static setRegistered(ctx: StateContext<MasterStateModel>, action: EmitterAction<string>) {
    const id = action.payload;
    const config: BootstrapConfig = AppRegistry.getBootstrapConfig(id);

    const newModel = MasterState.createAppStateModel(id, config, true, false);
    ctx.patchState({ apps: ctx.getState().apps.concat(newModel) });

    // enable styles
    if (config) {
      config.styles.forEach(style => DomUtils.enableStyle(DomUtils.toStyleSelector(`${ config.app }/${ style.url }`), true));
    }
  }

  /**
   * Updates the existing entry and sets the destroyed flag to `true` - does not delete the entry.
   * So if the same MF gets created and registers itself again at the CL a new entry will get created for that.
   * The stylesheet of the MF gets disabled (not removed).
   */
  @Receiver()
  public static setDestroyed(ctx: StateContext<MasterStateModel>, action: EmitterAction<string>) {
    const stateModel: AppStateModel = ctx
      .getState()
      .apps.filter(app => app.id === action.payload)
      .pop();
    const newModel = MasterState.createAppStateModel(stateModel.id, stateModel.config, stateModel.registered, true);

    ctx.patchState({
      apps: ctx.getState().apps.map(app => (app.id === action.payload ? newModel : app))
    });

    // disable styles
    stateModel.config.styles.forEach(
      style => DomUtils.enableStyle(DomUtils.toStyleSelector(`${ stateModel.config.app }/${ style.url }`), false));
  }

  /** static selector whether the products is registered and not destroyed */
  @Selector()
  public static isProductsRegisteredAndAlive(state: MasterStateModel): boolean {
    return state.apps.filter(app => app.id === 'products' && app.registered && !app.destroyed).length > 0;
  }
}
