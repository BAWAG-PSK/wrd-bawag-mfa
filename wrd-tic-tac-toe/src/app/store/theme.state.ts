import { Selector, State, StateContext } from '@ngxs/store';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';

export interface ThemeStateModel {
  theme: string;
}

@State<ThemeStateModel>({
  name: 'theme',
  defaults: {
    theme: 'light-theme'
  }
})
export class ThemeState {
  @Receiver()
  public static setTheme(ctx: StateContext<ThemeStateModel>, { payload }: EmitterAction<string>) {
    ctx.setState({ theme: payload });
  }

  @Selector()
  public static getTheme(state: ThemeStateModel): string {
    return state.theme;
  }
}
