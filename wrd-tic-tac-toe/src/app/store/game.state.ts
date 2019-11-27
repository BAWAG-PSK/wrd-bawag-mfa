import { State, StateContext } from '@ngxs/store';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { Game, IMovement } from './models';

@State<Game>({
  name: 'game',
  defaults: {
    score: { x: 0, o: 0 },
    isPlaying: true,
    xTurn: true,
    movementArray: []
  }
})
export class GameState {
  @Receiver()
  public static addMovement({ patchState, getState }: StateContext<Game>, { payload }: EmitterAction<IMovement>): void {
    const state = getState();
    const movementArray = state.movementArray;
    patchState({ movementArray: movementArray.concat(payload), xTurn: !state.xTurn });
  }

  @Receiver()
  public static reset({ setState, getState }: StateContext<Game>): void {
    setState({
      ...getState(),
      xTurn: true,
      isPlaying: true,
      movementArray: []
    });
  }

  @Receiver()
  public static finishGame({ patchState, getState }: StateContext<Game>): void {
    const state = getState();
    const newScore = GameState.manageScore(state);
    patchState({
      score: newScore,
      isPlaying: false
    });
  }

  private static manageScore(state: Game) {
    const lastItem = state.movementArray[state.movementArray.length - 1];

    if (lastItem.movement === 'X') {
      return {
        ...state.score,
        x: state.score.x + 1
      };
    } else {
      return {
        ...state.score,
        o: state.score.o + 1
      };
    }
  }
}
