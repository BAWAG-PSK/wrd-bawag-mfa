import { CellPosition } from '../features/game/interfaces/interfaces';

export interface Game {
  score: IScore;
  isPlaying: boolean;
  xTurn: boolean;
  movementArray: IMovement[];
}

export interface IMovement {
  cellId: CellPosition;
  movement: string;
}

export interface IScore {
  x: number;
  o: number;
}
